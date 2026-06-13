# 3D Models Directory

Add your glTF/GLB model files here for the 3D viewer.

## Directory Structure

```
models/
├── dumpster.glb              # Single GLB file (recommended)
├── dumpster/
│   ├── model.glb
│   └── textures/
│       ├── albedo.png
│       ├── normal.png
│       └── roughness.png
└── other-model.glb
```

## Uploading Your Model

1. **Export from Blender/3DS Max:**
   - Export as glTF 2.0 (GLB format)
   - Ensure textures are embedded (GLB) or copy separately (glTF)

2. **Upload to Project:**
   - Copy `.glb` file to this directory
   - Update component: `modelPath="/assets/models/your-model.glb"`

3. **Production (AWS S3):**
   - Upload `.glb` to S3 bucket
   - Use S3 URL: `https://bucket.s3.amazonaws.com/models/your-model.glb`

## File Format Support

- ✅ **GLB** (Binary glTF) - Recommended, single file with embedded textures
- ✅ **glTF** (JSON) - Requires separate texture files
- ✅ **GLTF with Draco Compression** - Even smaller files

See [MODEL_MANAGEMENT_GUIDE.md](../MODEL_MANAGEMENT_GUIDE.md) for detailed setup.
