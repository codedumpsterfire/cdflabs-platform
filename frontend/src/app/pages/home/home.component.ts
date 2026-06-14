import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Viewer3DComponent } from '../../components/3d-viewer/3d-viewer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Viewer3DComponent],
  template: `
    <div class="home-container">
        <app-3d-viewer
          modelPath="/assets/models/scene.gltf"
        ></app-3d-viewer>
    </div>
  `,
  styles: [`
    .home-container {
      width: auto;
      height: auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  `],
})
export class HomeComponent {}
