# Figma Design Implementation Guide

This guide explains how to use the Figma design files to implement the actual UI/UX for the D2B platform.

## Current Situation

You have Figma design files in `/projectDocs/figma_extract/` that contain the actual UI designs for:
- Landing page
- Login/Register pages  
- Dashboard layout
- Dashboard components
- All other pages and components

**These designs need to be implemented in the codebase**, not just viewed.

## Available Tools

### 1. Design Reference Viewer
**Location:** http://localhost:3000/design-reference

This page allows you to:
- View all Figma design screens
- Search through designs
- Download images
- Compare designs side-by-side with implementation

### 2. Figma API Extraction Script
**Location:** `scripts/extract-figma-designs.js`

**To use:**
1. Get a Figma Personal Access Token:
   - Go to https://www.figma.com/developers/api#access-tokens
   - Generate a personal access token

2. Get your Figma File Key:
   - Open your Figma file
   - Copy the file key from the URL: `https://www.figma.com/file/{FILE_KEY}/...`

3. Set environment variables:
   ```bash
   export FIGMA_TOKEN="your-token-here"
   export FIGMA_FILE_KEY="your-file-key-here"
   ```

4. Run the extraction:
   ```bash
   npm run extract-figma
   ```

This will extract:
- Colors (with hex codes)
- Typography (font families, sizes, weights)
- Spacing (padding, margins, gaps)
- Component structures

### 3. Manual Implementation Process

If you don't have Figma API access:

1. **View Designs:**
   - Navigate to http://localhost:3000/design-reference
   - Browse through all design screens
   - Download specific screens you need to implement

2. **Extract Design Tokens:**
   - Use browser dev tools (F12) on the design reference page
   - Use color picker to extract exact colors
   - Measure spacing using browser ruler tools
   - Note typography styles

3. **Update Tailwind Config:**
   - Add extracted colors to `tailwind.config.js`
   - Update spacing scale if needed
   - Update typography settings

4. **Implement Components:**
   - Compare Figma design with current component
   - Update component to match exactly
   - Test responsive breakpoints
   - Verify accessibility

## Implementation Checklist

For each page/component:

- [ ] View Figma design in reference viewer
- [ ] Extract design tokens (colors, spacing, typography)
- [ ] Compare with current implementation
- [ ] Update component structure
- [ ] Update styling to match Figma
- [ ] Test responsive design
- [ ] Verify accessibility
- [ ] Cross-browser testing
- [ ] Performance optimization

## Priority Order

1. **Landing Page** (`/app/page.tsx`, `/components/landing/*`)
2. **Login/Register Pages** (`/app/auth/login/page.tsx`, `/app/auth/register/page.tsx`)
3. **Dashboard Layout** (`/components/dashboard/DesignerDashboard.tsx`)
4. **Dashboard Components:**
   - Project Overview
   - AI Tools Panel
   - Portfolio Manager
   - Designer Sidebar

## Design Token Extraction

### Colors
1. Open design in browser
2. Use browser dev tools color picker
3. Extract hex codes
4. Add to `tailwind.config.js` colors section
5. Use semantic names (e.g., `primary-500`, `secondary-600`)

### Typography
1. Inspect text elements in design
2. Note:
   - Font family
   - Font size
   - Font weight
   - Line height
   - Letter spacing
3. Update `tailwind.config.js` typography section

### Spacing
1. Measure padding, margins, gaps
2. Use consistent spacing scale
3. Update Tailwind spacing if needed

### Components
1. Identify reusable components
2. Note component states (hover, active, disabled)
3. Extract component variants
4. Implement in React/TypeScript

## Next Steps

1. **Set up Figma API access** (recommended):
   ```bash
   # Add to .env.local
   FIGMA_TOKEN=your-token
   FIGMA_FILE_KEY=your-file-key
   ```

2. **Extract design tokens:**
   ```bash
   npm run extract-figma
   ```

3. **Start implementing:**
   - Begin with landing page
   - Use design reference viewer
   - Update components one by one

4. **Review and iterate:**
   - Compare implementation with Figma
   - Make adjustments
   - Test thoroughly

## Resources

- [Figma API Documentation](https://www.figma.com/developers/api)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Design Reference Viewer](/design-reference)
- [Figma Design Files](/projectDocs/figma_extract/)

## Questions?

If you need help:
1. Check the design reference viewer
2. Review extracted design tokens
3. Compare with current implementation
4. Use browser dev tools for measurements

