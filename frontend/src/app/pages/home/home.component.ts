import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Viewer3DComponent } from '../../components/3d-viewer/3d-viewer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Viewer3DComponent],
  template: `
    <div class="home-container">
      <div class="header">
        <h1>3D Model Viewer</h1>
        <p>Upload your glTF/GLB model or use a model from AWS S3</p>
      </div>

      <div class="viewer-wrapper">
        <app-3d-viewer
          modelPath="/assets/models/scene.gltf"
          modelName="Dumpster Model"
        ></app-3d-viewer>
      </div>

      <div class="instructions">
        <h3>📁 Model Setup Instructions:</h3>
        <ul>
          <li>Place .glb or .gltf files in <code>src/assets/models/</code></li>
          <li>Models are automatically lazy-loaded when needed</li>
          <li>For production, store models in AWS S3 and reference the URL</li>
          <li>Move your mouse over the model to rotate it</li>
        </ul>

        <h3>☁️ AWS S3 Setup:</h3>
        <ul>
          <li>Create an S3 bucket for your 3D assets</li>
          <li>Enable CORS on the bucket</li>
          <li>Use presigned URLs or public access for models</li>
          <li>Update the <code>modelPath</code> prop to S3 URL</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .header {
      text-align: center;
    }

    .header h1 {
      font-size: 2.2rem;
      margin: 0 0 0.5rem 0;
      font-weight: 700;
    }

    .header p {
      font-size: 1.1rem;
      margin: 0;
      opacity: 0.9;
    }

    .viewer-wrapper {
      flex: 1;
      min-height: 500px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .instructions {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 2rem;
      backdrop-filter: blur(10px);
    }

    .instructions h3 {
      font-size: 1.1rem;
      margin: 0 0 1rem 0;
      font-weight: 600;
    }

    .instructions h3:not(:first-of-type) {
      margin-top: 1.5rem;
    }

    .instructions ul {
      margin: 0;
      padding-left: 1.5rem;
      list-style: none;
    }

    .instructions li {
      position: relative;
      margin-bottom: 0.75rem;
      padding-left: 1rem;
    }

    .instructions li::before {
      content: '→';
      position: absolute;
      left: 0;
    }

    .instructions code {
      background: rgba(102, 126, 234, 0.2);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .home-container {
        gap: 1rem;
      }

      .header h1 {
        font-size: 1.8rem;
      }

      .viewer-wrapper {
        min-height: 350px;
      }

      .instructions {
        padding: 1.5rem;
      }

      .instructions h3 {
        font-size: 1rem;
      }
    }
  `],
})
export class HomeComponent {}
