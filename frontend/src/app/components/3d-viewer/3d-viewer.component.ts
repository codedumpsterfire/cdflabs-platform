import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-3d-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="viewer-container">
      <canvas #canvas class="canvas"></canvas>
      <div class="controls">
        <p class="model-name">{{ modelName }}</p>
      </div>
    </div>
  `,
  styles: [`
    .viewer-container {
      width: 100%;
      height: 100%;
      position: relative;
      background: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.1) 0%,
        rgba(118, 75, 162, 0.1) 100%
      );
      border-radius: 8px;
      overflow: hidden;
    }

    .canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    .controls {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .model-name {
      margin: 0;
      font-weight: 500;
    }
  `],
})
export class Viewer3DComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() modelPath: string = '';
  @Input() modelName: string = 'Model';

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model!: THREE.Group;
  private animationFrameId: number | null = null;
  private isAnimating = true;
  private gltfLoader = new GLTFLoader();
  private modelCache = new Map<string, THREE.Group>();

  ngAfterViewInit(): void {
    this.initThreeScene();
    if (this.modelPath) {
      this.loadModel();
    }
  }

  private initThreeScene(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);
    this.scene.fog = new THREE.Fog(0x1a1a2e, 1000, 10000);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 2, 3);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    // Lighting
    this.setupLighting();

    // Mouse controls
    this.setupMouseControls();

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());

    // Start animation loop
    this.animate();
  }

  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    this.scene.add(directionalLight);

    // Point light for accent
    const pointLight = new THREE.PointLight(0x667eea, 0.5);
    pointLight.position.set(-5, 3, 5);
    this.scene.add(pointLight);
  }

  private setupMouseControls(): void {
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', e => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (this.model) {
        this.model.rotation.y = mouseX * 1;
        this.model.rotation.x = mouseY * 0.5;
      }
    });
  }

  private loadModel(): void {
    // Check cache first
    if (this.modelCache.has(this.modelPath)) {
      this.model = this.modelCache.get(this.modelPath)!.clone();
      this.setupModel();
      return;
    }

    // Load from file
    this.gltfLoader.load(
      this.modelPath,
      gltf => {
        this.model = gltf.scene;
        this.modelCache.set(this.modelPath, this.model);
        this.scene.add(this.model);
        this.setupModel();
      },
      undefined,
      error => {
        console.error(`Failed to load model: ${this.modelPath}`, error);
      }
    );
  }

  private setupModel(): void {
    if (!this.model) return;

    // Center and scale model
    const box = new THREE.Box3().setFromObject(this.model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Center the model
    this.model.position.sub(center);

    // Scale to fit view
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 4 / maxDim;
    this.model.scale.multiplyScalar(scale);

    // Enable shadows on model meshes
    this.model.traverse(node => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  }

  private animate = (): void => {
    if (!this.isAnimating) return;

    this.animationFrameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  ngOnDestroy(): void {
    this.isAnimating = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', () => this.onWindowResize());
    this.renderer?.dispose();
  }
}
