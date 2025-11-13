# Figma Image Extraction Guide

This guide explains how to extract images from Figma with proper naming based on the Figma file structure.

## Prerequisites

1. **Figma Personal Access Token**
   - Go to https://www.figma.com/developers/api#access-tokens
   - Click "Generate new token"
   - Copy the token (you'll only see it once!)

2. **Figma File Key**
   - Open your Figma file in a browser
   - The URL will look like: `https://www.figma.com/file/JnaH4XkIWau2zLLUVTd9gV/D2B-Final-Design--shared-?...`
   - The File Key is the part after `/file/` and before the next `/` (e.g., `JnaH4XkIWau2zLLUVTd9gV`)

## Setup

1. Add the credentials to your `.env` file:

```bash
FIGMA_TOKEN=your_figma_personal_access_token_here
FIGMA_FILE_KEY=JnaH4XkIWau2zLLUVTd9gV
```

2. Run the extraction script:

```bash
npm run extract-figma-images
```

## What the Script Does

1. **Connects to Figma API** - Authenticates with your token and fetches the file structure
2. **Finds Exportable Nodes** - Scans for frames, components, and groups that can be exported
3. **Builds Proper Names** - Creates filenames based on the node hierarchy in Figma
   - Example: A frame named "Splash Screen" in a page "Onboarding" becomes `onboarding_splash_screen.png`
4. **Downloads Images** - Downloads all images at 2x resolution (PNG format)
5. **Creates Mapping** - Saves a JSON file mapping original node IDs to new filenames

## Output

- **Labeled Images**: `projectDocs/figma_extract/images_labeled/`
  - All images with proper names based on Figma structure
  - Example: `start_splash_screen.png`, `client_dashboard.png`, etc.

- **Mapping File**: `projectDocs/figma_extract/images-mapping.json`
  - Maps original node IDs to new filenames
  - Includes metadata about each image

## API Endpoints

After extraction, you can access labeled images via:

- **List all labeled images**: `GET /api/figma/images-labeled`
- **Get specific image**: `GET /api/figma/images-labeled/{filename}`
- **Get mapping**: `GET /api/figma/images-mapping`

## Usage in Code

Instead of using hash-based IDs:
```tsx
// Old way (hash-based)
<img src="/api/figma/images/80878c1df4aee5873d374a4af9fc84e7d2ab08a6" />
```

Use meaningful names:
```tsx
// New way (labeled)
<img src="/api/figma/images-labeled/splash_screen.png" />
```

## Troubleshooting

### Error: "Missing FIGMA_TOKEN or FIGMA_FILE_KEY"
- Make sure both are set in your `.env` file
- Restart your development server after adding them

### Error: "401 Unauthorized"
- Your Figma token may be invalid or expired
- Generate a new token from the Figma developer settings

### Error: "404 Not Found"
- Check that the File Key is correct
- Make sure you have access to the Figma file
- The file must be accessible with your account

### No images extracted
- Make sure your Figma frames/components have export settings
- Check that nodes are named (unnamed nodes will be skipped)

## Notes

- Images are downloaded at 2x resolution for retina displays
- The script preserves the folder/page structure in the filename
- Duplicate names will overwrite (use unique names in Figma)
- The extraction process may take a few minutes for large files



