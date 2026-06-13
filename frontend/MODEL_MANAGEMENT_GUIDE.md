# 3D Model Management Guide

## Project Structure

```
src/
├── assets/
│   └── models/
│       ├── dumpster/
│       │   ├── model.glb          # The 3D model file
│       │   ├── textures/          # Texture files if separate
│       │   └── metadata.json      # Optional: model info
│       └── sample-dumpster.glb    # Single file model
├── services/
│   └── model-loader.service.ts    # Lazy model loading
└── app/
    └── components/
        └── 3d-viewer/
            └── 3d-viewer.component.ts
```

## File Format Options

### GLB (Recommended)
- **Extension**: `.glb`
- **Type**: Binary glTF
- **Pros**: Single file, smaller, includes textures
- **Best for**: Web delivery, S3 storage
- **Upload**: Use the decompressed `.glb` file directly

### glTF with Textures
- **Extension**: `.gltf` + textures
- **Type**: Text JSON + separate resources
- **Pros**: Better for editing, modular
- **Cons**: Multiple files to manage
- **Upload**: `.gltf` file + associated texture folder

## Local Development Setup

### 1. Create Models Folder
```bash
mkdir -p src/assets/models
```

### 2. Add Your Dumpster Model
```
src/assets/models/
├── dumpster.glb              # Place your GLB file here
└── dumpster/
    ├── model.glb
    └── textures/
        ├── color.png
        ├── normal.png
        └── metallic.png
```

### 3. Use in Component
```typescript
<app-3d-viewer
  modelPath="/assets/models/dumpster.glb"
  modelName="Dumpster"
></app-3d-viewer>
```

## AWS S3 Setup

### 1. Create S3 Bucket
```bash
# Console: S3 > Create Bucket
# Name: cdflabs-3d-assets
# Region: us-east-1 (or nearest to users)
```

### 2. Enable CORS
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["https://yourdomain.com", "http://localhost:*"],
    "ExposeHeaders": ["x-amz-meta-*"],
    "MaxAgeSeconds": 3000
  }
]
```

### 3. Upload Models
```bash
aws s3 cp src/assets/models/dumpster.glb s3://cdflabs-3d-assets/models/
```

### 4. Use S3 URL in Component
```typescript
<app-3d-viewer
  modelPath="https://cdflabs-3d-assets.s3.amazonaws.com/models/dumpster.glb"
  modelName="Dumpster"
></app-3d-viewer>
```

### 5. Generate Presigned URLs (Optional)
```typescript
// Use AWS SDK to generate presigned URL
// Useful for private models with access control
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
```

## Model Optimization

### Before Upload to S3
1. **Reduce Polycount**: 50K-200K triangles recommended
2. **Compress Textures**: Use WebP or compressed PNG
3. **Draco Compression**: Three.js supports compressed glTF

Example with Blender:
- Export as glTF 2.0 (GLB)
- Enable: "Format: GLB"
- Check: "Compression" (for smaller file)
- Recommended: Keep file < 10MB

### File Size Guidelines
- Small model: < 1MB (quick load)
- Medium model: 1-5MB (good balance)
- Large model: 5-20MB (high detail)

## Lazy Loading Strategy

Models are automatically cached via `ModelLoaderService`:
- First load: Fetches from server/S3
- Subsequent loads: Uses cache
- Cache management: Call `modelLoader.clearCache()` if needed

### Preload Models
```typescript
constructor(private modelLoader: ModelLoaderService) {}

ngOnInit() {
  // Preload models in background
  this.modelLoader.loadModel('/assets/models/dumpster.glb');
}
```

## CloudFront CDN (Optional)

For better performance, distribute via CloudFront:
1. Create CloudFront distribution pointing to S3
2. Use distribution URL instead of S3 direct URL
3. Set cache TTL to 30+ days for assets

Example:
```typescript
modelPath="https://d123.cloudfront.net/models/dumpster.glb"
```

## Monitoring & Analytics

Track model loading performance:
```typescript
const startTime = performance.now();
this.modelLoader.loadModel(path).then(() => {
  const loadTime = performance.now() - startTime;
  console.log(`Model loaded in ${loadTime}ms`);
  // Send to analytics
});
```
