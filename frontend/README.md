# CDFlabs 3D Platform - Frontend

A modern Angular-based 3D web application built with Vite, featuring immersive Blender models, smooth GSAP animations, and seamless integration with Spring Boot backend and AWS services.

## 🏗️ Tech Stack Overview

### Frontend Framework & Build
- **Angular 18** - Enterprise-grade web framework with component-based architecture
- **Vite** - Lightning-fast build tool and dev server, significantly faster than traditional webpack
- **TypeScript** - Typed superset of JavaScript for better code quality and maintainability
- **RxJS** - Reactive programming library for handling asynchronous data streams and complex state management

### 3D & Graphics
- **Three.js** - Powerful 3D graphics library for rendering WebGL scenes
- **Babylon.js** - Alternative 3D engine with advanced physics and particle systems
- **GSAP** - Industry-standard animation library for smooth, performant timeline-based animations
- **glTF Transform** - Tool for optimizing and manipulating 3D models loaded from Blender

### Backend & Database
- **Supabase** - Open-source Firebase alternative providing PostgreSQL database and authentication
- **Spring Boot** - Java backend framework (deployed separately)
- **PostgreSQL** - Relational database via Supabase

### Cloud & Infrastructure
- **AWS S3** - Object storage for 3D model assets and media files
- **AWS Cognito** - Identity and access management for user authentication
- **Vercel** - Modern deployment platform optimized for frontend applications

### Testing
- **Vitest** - Fast, Vite-native unit testing framework
- **Jest** - Comprehensive JavaScript testing framework with snapshot testing
- **Karma & Jasmine** - Angular CLI default testing setup for component testing
- **Playwright** - Cross-browser end-to-end testing for user workflows
- **Cypress** - Developer-friendly E2E testing tool with excellent debugging capabilities

### Code Quality
- **ESLint** - Static code analysis to catch errors and enforce best practices
- **Prettier** - Code formatter for consistent code style
- **TypeScript Compiler** - Type checking for development

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **yarn** 4.0+
- **Git** for version control
- AWS account with S3 and Cognito configured
- Supabase project set up
- Spring Boot backend running (for full integration)

## 🚀 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd frontend
npm install
# or
yarn install
```

### 2. Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AWS Configuration
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=your_aws_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
VITE_AWS_S3_BUCKET=your-bucket-name
VITE_AWS_COGNITO_POOL_ID=your_cognito_pool_id
VITE_AWS_COGNITO_CLIENT_ID=your_cognito_client_id

# Spring Boot Backend
VITE_API_URL=http://localhost:8080
```

### 3. Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser. The app will automatically reload when you make changes.

### 4. Type Checking

Run TypeScript compiler to check for type errors:

```bash
npm run type-check
```

## 🧪 Testing

### Unit Tests

Run unit tests with Vitest:

```bash
npm run test           # Run tests once
npm run test:ui        # Interactive UI mode
npm run test:coverage  # Generate coverage report
```

### E2E Tests

Run end-to-end tests with Playwright:

```bash
npm run e2e           # Headless mode
npm run e2e:ui        # UI mode for debugging
```

Run Cypress tests:

```bash
npx cypress open      # Interactive Cypress Studio
npx cypress run       # Headless execution
```

## 🏗️ Building

### Production Build

Build the application for production deployment:

```bash
npm run build
```

The optimized build output is generated in the `dist/` directory and is ready for deployment to Vercel.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📦 Deployment on Vercel

### Automatic Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the project as a Vite application
3. Configure environment variables in Vercel project settings
4. Each push to the main branch triggers automatic deployment

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Vercel will automatically optimize your build for the platform.

## 🔐 Code Quality

### Linting

Check code for errors and style violations:

```bash
npm run lint
```

### Format Code

Format all code files:

```bash
npm run format
```

## 📚 Library Details

### Core Framework
- **Angular**: Provides component-based architecture, dependency injection, and powerful routing system
- **RxJS**: Manages complex asynchronous operations and state management through observables
- **TypeScript**: Adds static typing for better IDE support and fewer runtime errors

### 3D Graphics
- **Three.js**: Renders Blender-exported models; handles lighting, materials, and camera controls
- **Babylon.js**: Advanced physics engine alternative with particle systems and post-processing effects
- **GSAP**: Creates smooth, performant animations and transitions between 3D scenes
- **glTF Transform**: Optimizes and compresses 3D models for faster loading and lower bandwidth

### Backend Integration
- **Supabase**: Provides real-time database updates and user authentication
- **AWS SDK**: Enables secure file uploads to S3 and user management through Cognito
- **Axios**: HTTP client for API communication with Spring Boot backend

### Development Tools
- **Vite**: Provides instant server start and lightning-fast HMR (Hot Module Replacement)
- **ESLint & TypeScript ESLint**: Ensures code consistency and catches potential errors
- **Prettier**: Maintains consistent code formatting across the team
- **Vitest**: Unit test runner with excellent TypeScript support and Vite integration

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/        # Reusable Angular components
│   │   ├── services/          # API and business logic services
│   │   ├── models/            # TypeScript interfaces and types
│   │   ├── guards/            # Route guards and interceptors
│   │   └── app.component.ts   # Root component
│   ├── assets/                # 3D models, images, and static files
│   ├── environments/          # Environment configurations
│   ├── styles/                # Global SCSS/CSS styles
│   └── main.ts                # Application entry point
├── public/                    # Static files served directly
├── dist/                      # Production build output
├── package.json               # Project dependencies
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── angular.json               # Angular configuration
├── .env.local                 # Local environment variables
└── README.md                  # This file
```

## 🔗 Integration Guide

### Supabase Integration

User authentication and real-time database synchronization:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### AWS S3 Integration

Upload 3D models and assets:

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({ region: import.meta.env.VITE_AWS_REGION })
```

### Spring Boot Backend Communication

API calls to backend services:

```typescript
import { HttpClient } from '@angular/common/http'

constructor(private http: HttpClient) {}

this.http.get(`${import.meta.env.VITE_API_URL}/api/data`)
```

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Clear Node Modules Cache
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
npm run type-check
```

## 📖 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://gsap.com/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 📝 License

This project is proprietary software of CDFlabs. All rights reserved.

## 👥 Contributing

Please follow the code style guidelines and ensure all tests pass before submitting pull requests.

---

**Last Updated**: 2024
**Node Version**: 18.0.0+
**Package Manager**: npm 9.0.0+ or yarn 4.0+
