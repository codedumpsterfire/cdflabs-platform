import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <header>
        <h1>{{ title }}</h1>
        <p>3D Angular application with Blender models, GSAP animations, and AWS integration</p>
      </header>

      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styles: [`
    main {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    }

    header {
      text-align: center;
      margin-bottom: 3rem;
    }

    header h1 {
      font-size: 2.5rem;
      margin: 0;
      font-weight: 700;
    }

    header p {
      font-size: 1.1rem;
      margin: 0.5rem 0 0 0;
      opacity: 0.9;
    }

    .content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 768px) {
      main {
        padding: 1rem;
      }

      header h1 {
        font-size: 1.8rem;
      }

      header p {
        font-size: 1rem;
      }
    }
  `],
})
export class AppComponent {
  title = 'CDF X LABS';
}
