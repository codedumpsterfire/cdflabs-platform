import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export interface LoadedModel {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

@Injectable({
  providedIn: 'root',
})
export class ModelLoaderService {
  private loader = new GLTFLoader();
  private cache = new Map<string, LoadedModel>();

  /**
   * Load a glTF model with caching
   * @param path - Path to the model file (e.g., '/assets/models/dumpster.glb')
   * @returns Promise with loaded model
   */
  loadModel(path: string): Promise<LoadedModel> {
    // Return cached model if available
    if (this.cache.has(path)) {
      return Promise.resolve(this.cache.get(path)!);
    }

    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        gltf => {
          const model: LoadedModel = {
            scene: gltf.scene,
            animations: gltf.animations || [],
          };
          this.cache.set(path, model);
          resolve(model);
        },
        undefined,
        error => {
          console.error(`Failed to load model: ${path}`, error);
          reject(error);
        }
      );
    });
  }

  /**
   * Clear model cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}
