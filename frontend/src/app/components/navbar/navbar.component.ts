import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface FallingCode {
  id: number;
  left: number;
  char: string;
  delay: number;
  curveVariation: number;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="navbar-wrapper">
      <nav class="code-navbar">
        <div class="code-flow-background">
          <div class="code-stream" *ngFor="let i of [0,1,2,3,4,5,6,7]" [style.animation-delay]="i * 0.15 + 's'" [style.top]="i * 1.8 + 'rem'" [ngClass]="'stream-curve-' + (i % 4)"></div>
        </div>
        <div class="navbar-container">
          <div class="nav-links">
            <a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">
              <span class="bracket">&lt;</span>
              <span class="tag">home</span>
              <span class="bracket">/&gt;</span>
            </a>

            <span class="separator">|</span>

            <a routerLink="/home/listings" routerLinkActive="active" class="nav-link">
              <span class="bracket">&lt;</span>
              <span class="tag">listings</span>
              <span class="bracket">/&gt;</span>
            </a>
          </div>
        </div>
      </nav>

      <div class="code-fall-zone">
        <div class="falling-code" 
          *ngFor="let code of fallingCodes" 
          [style.left]="code.left + '%'"
          [style.animation-delay]="code.delay + 's'"
          [ngClass]="'curve-' + code.curveVariation">
          <span class="binary-char">{{ code.char }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .navbar-wrapper {
      position: relative;
      width: 100%;
      display: flex;
    }

    .code-navbar {
      background: rgba(20, 20, 30, 0.95);
      border-bottom: 2px solid #00ff88;
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      font-family: 'Courier New', monospace;
      overflow: hidden;
      width: 70%;
    }

    .code-flow-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.15;
      overflow: hidden;
      pointer-events: none;
      height: 100%;
      width: 100%;
    }

    .code-stream {
      position: absolute;
      top: 0;
      left: -100%;
      height: auto;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 0.85rem;
      color: #00ff88;
      font-weight: bold;
      white-space: nowrap;
      letter-spacing: 0.4rem;
      padding-right: 20%;
    }

    .code-stream::before {
      content: "01 10 11 00 01 10 11 00 01 10 11 00 01 10 11 00 01 10 11 00 01 10 11 00 01 10 11 00 01 10 11 00 01 10 11 00 01 10";
    }

    .code-stream.stream-curve-0 {
      animation: codeStreamFlow0 18s linear infinite;
    }

    .code-stream.stream-curve-1 {
      animation: codeStreamFlow1 18s linear infinite;
    }

    .code-stream.stream-curve-2 {
      animation: codeStreamFlow2 18s linear infinite;
    }

    .code-stream.stream-curve-3 {
      animation: codeStreamFlow3 18s linear infinite;
    }

    @keyframes codeStreamFlow0 {
      0% {
        transform: translateX(0) translateY(0);
      }
      50% {
        transform: translateX(calc(100% * 0.5)) translateY(8px);
      }
      100% {
        transform: translateX(100%) translateY(0);
      }
    }

    @keyframes codeStreamFlow1 {
      0% {
        transform: translateX(0) translateY(0);
      }
      50% {
        transform: translateX(calc(100% * 0.5)) translateY(12px);
      }
      100% {
        transform: translateX(100%) translateY(0);
      }
    }

    @keyframes codeStreamFlow2 {
      0% {
        transform: translateX(0) translateY(0);
      }
      50% {
        transform: translateX(calc(100% * 0.5)) translateY(-8px);
      }
      100% {
        transform: translateX(100%) translateY(0);
      }
    }

    @keyframes codeStreamFlow3 {
      0% {
        transform: translateX(0) translateY(0);
      }
      50% {
        transform: translateX(calc(100% * 0.5)) translateY(-12px);
      }
      100% {
        transform: translateX(100%) translateY(0);
      }
    }

    .navbar-container {
      max-width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      padding: 0 2rem;
      animation: codeFlow 0.6s ease-out;
      position: relative;
      z-index: 10;
    }

    @keyframes codeFlow {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      justify-content: center;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      text-decoration: none;
      color: #00ff88;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      font-size: 0.95rem;
      font-family: 'Courier New', monospace;
      text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    }

    .nav-link:hover {
      color: #fff;
      background: rgba(0, 255, 136, 0.1);
      box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
      transform: translateY(-2px);
    }

    .nav-link.active {
      background: rgba(0, 255, 136, 0.2);
      box-shadow: inset 0 0 10px rgba(0, 255, 136, 0.3), 0 0 20px rgba(0, 255, 136, 0.4);
      color: #fff;
    }

    .bracket {
      color: #00d4ff;
      font-weight: bold;
    }

    .tag {
      color: #00ff88;
      font-style: normal;
      font-weight: bold;
    }

    .separator {
      color: #00ff88;
      opacity: 0.5;
      font-size: 1.2rem;
    }

    .code-fall-zone {
      position: relative;
      width: 30%;
      min-height: 60px;
      background: linear-gradient(90deg, transparent 0%, rgba(20, 20, 30, 0.5) 0%, rgba(20, 20, 30, 0.3) 100%);
      border-bottom: 2px solid #00ff88;
      box-shadow: inset 0 0 20px rgba(0, 255, 136, 0.1);
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      padding-top: 0.5rem;
    }

    .falling-code {
      position: absolute;
      top: -30px;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      font-size: 1.2rem;
      color: #00ff88;
      text-shadow: 0 0 5px rgba(0, 255, 136, 0.8);
      pointer-events: none;
    }

    .falling-code.curve-0 {
      animation: codeGravityFall0 2.5s ease-in forwards;
    }

    .falling-code.curve-1 {
      animation: codeGravityFall1 2.5s ease-in forwards;
    }

    .falling-code.curve-2 {
      animation: codeGravityFall2 2.5s ease-in forwards;
    }

    .falling-code.curve-3 {
      animation: codeGravityFall3 2.5s ease-in forwards;
    }

    .binary-char {
      display: inline-block;
    }

    @keyframes codeGravityFall0 {
      0% {
        transform: translateX(0) translateY(0) rotateZ(0deg);
        opacity: 1;
      }
      50% {
        transform: translateX(25px) translateY(50px) rotateZ(10deg);
      }
      100% {
        transform: translateX(15px) translateY(200px) rotateZ(45deg);
        opacity: 0;
      }
    }

    @keyframes codeGravityFall1 {
      0% {
        transform: translateX(0) translateY(0) rotateZ(0deg);
        opacity: 1;
      }
      50% {
        transform: translateX(35px) translateY(60px) rotateZ(15deg);
      }
      100% {
        transform: translateX(20px) translateY(200px) rotateZ(45deg);
        opacity: 0;
      }
    }

    @keyframes codeGravityFall2 {
      0% {
        transform: translateX(0) translateY(0) rotateZ(0deg);
        opacity: 1;
      }
      50% {
        transform: translateX(45px) translateY(55px) rotateZ(20deg);
      }
      100% {
        transform: translateX(30px) translateY(200px) rotateZ(45deg);
        opacity: 0;
      }
    }

    @keyframes codeGravityFall3 {
      0% {
        transform: translateX(0) translateY(0) rotateZ(0deg);
        opacity: 1;
      }
      50% {
        transform: translateX(55px) translateY(65px) rotateZ(25deg);
      }
      100% {
        transform: translateX(40px) translateY(200px) rotateZ(45deg);
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .code-navbar {
        width: 100%;
      }

      .code-fall-zone {
        display: none;
      }

      .navbar-container {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .nav-links {
        width: 100%;
        justify-content: center;
      }
    }
  `],
})
export class NavbarComponent implements OnInit, OnDestroy {
  fallingCodes: FallingCode[] = [];
  private codeId = 0;
  private interval: any;

  ngOnInit() {
    this.startGeneratingFallingCode();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private startGeneratingFallingCode(): void {
    this.interval = setInterval(() => {
      const newCode: FallingCode = {
        id: this.codeId++,
        left: Math.random() * 100,
        char: Math.random() > 0.5 ? '1' : '0',
        delay: 0,
        curveVariation: Math.floor(Math.random() * 4),
      };
      this.fallingCodes.push(newCode);

      // Remove old codes to prevent memory leak
      if (this.fallingCodes.length > 30) {
        this.fallingCodes.shift();
      }
    }, 300);
  }
}
