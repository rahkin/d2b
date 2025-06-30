# Design2Build.Pro Color Palette

## Overview
This document outlines the comprehensive color system for Design2Build.Pro, designed to provide a sleek, modern, and minimalist visual experience that emphasizes professionalism, elegance, and focus.

## Color Philosophy
- **Minimalist**: Clean, uncluttered design with purposeful color usage
- **Professional**: Warm brown tones that convey trust and sophistication
- **Accessible**: High contrast ratios meeting WCAG 2.1 AA standards
- **Elegant**: Neutral tones that reflect professionalism and focus
- **Philippine-Ready**: Colors that work well with Filipino cultural context

## Primary Color Palette

### Primary (Warm Brown) - Professional Trust
- **Primary-50**: `#faf8f6` - Lightest background
- **Primary-100**: `#f5f0eb` - Light background
- **Primary-200**: `#e8dccf` - Subtle accent
- **Primary-300**: `#d4c0a8` - Light accent
- **Primary-400**: `#b89a7a` - Medium accent
- **Primary-500**: `#8b5e3c` - Base primary
- **Primary-600**: `#7a5234` - Primary hover
- **Primary-700**: `#6a472c` - Primary active
- **Primary-800**: `#5a3c24` - Dark primary
- **Primary-900**: `#4a311c` - Darkest primary
- **Primary-950**: `#3a2614` - Very dark primary

**Usage**: Buttons, navbar background, brand accents, primary actions

### Secondary (Deep Brown / Espresso) - Sophistication
- **Secondary-50**: `#f8f6f5` - Lightest background
- **Secondary-100**: `#f0ece9` - Light background
- **Secondary-200**: `#e0d8d2` - Subtle accent
- **Secondary-300**: `#c8b8ad` - Light accent
- **Secondary-400**: `#a89482` - Medium accent
- **Secondary-500**: `#5c4033` - Base secondary
- **Secondary-600**: `#523a2e` - Secondary hover
- **Secondary-700**: `#483329` - Secondary active
- **Secondary-800**: `#3e2c24` - Dark secondary
- **Secondary-900**: `#34251f` - Darkest secondary
- **Secondary-950**: `#2a1e1a` - Very dark secondary

**Usage**: Hover states, CTA highlights, card headers, secondary actions

### Accent (Muted Orange) - Call-to-Action
- **Accent-50**: `#fef8f4` - Lightest background
- **Accent-100**: `#fdf0e7` - Light background
- **Accent-200**: `#fae0c9` - Subtle accent
- **Accent-300**: `#f6c8a3` - Light accent
- **Accent-400**: `#f0a875` - Medium accent
- **Accent-500**: `#d97a3e` - Base accent
- **Accent-600**: `#c46e38` - Accent hover
- **Accent-700**: `#af6232` - Accent active
- **Accent-800**: `#9a562c` - Dark accent
- **Accent-900**: `#854a26` - Darkest accent
- **Accent-950**: `#703e20` - Very dark accent

**Usage**: Call-to-action buttons, success tags, highlights, important actions

## Status Colors

### Success (Green)
- **Success-50**: `#f0fdf4` - Light background
- **Success-500**: `#22c55e` - Base success
- **Success-600**: `#16a34a` - Success hover
- **Success-700**: `#15803d` - Success active

**Usage**: Success states, completed actions, positive feedback

### Warning (Amber)
- **Warning-50**: `#fffbeb` - Light background
- **Warning-500**: `#f59e0b` - Base warning
- **Warning-600**: `#d97706` - Warning hover
- **Warning-700**: `#b45309` - Warning active

**Usage**: Warnings, pending states, attention needed

### Error (Red)
- **Error-50**: `#fef2f2` - Light background
- **Error-500**: `#ef4444` - Base error
- **Error-600**: `#dc2626` - Error hover
- **Error-700**: `#b91c1c` - Error active

**Usage**: Errors, destructive actions, critical issues

## Neutral Colors

### Background (Light Gray)
- **Background**: `#f5f5f5` - Main background
- **Background-Secondary**: `#fafafa` - Secondary background
- **Background-Tertiary**: `#f0f0f0` - Tertiary background

### UI Elements / Borders (Medium Gray)
- **Border**: `#b0b0b0` - Primary border
- **Border-Secondary**: `#c0c0c0` - Secondary border
- **Border-Tertiary**: `#d0d0d0` - Tertiary border

### Text / Primary Font Color (Dark Gray)
- **Foreground**: `#333333` - Primary text
- **Foreground-Secondary**: `#666666` - Secondary text
- **Foreground-Tertiary**: `#999999` - Tertiary text
- **Foreground-Muted**: `#b0b0b0` - Muted text

### Neutral (Gray Scale)
- **Neutral-50**: `#fafafa` - Lightest background
- **Neutral-100**: `#f5f5f5` - Light background
- **Neutral-200**: `#e5e5e5` - Border color
- **Neutral-300**: `#d4d4d4` - Light border
- **Neutral-400**: `#a3a3a3` - Muted text
- **Neutral-500**: `#737373` - Secondary text
- **Neutral-600**: `#525252` - Primary text
- **Neutral-700**: `#404040` - Dark text
- **Neutral-800**: `#262626` - Very dark text
- **Neutral-900**: `#171717` - Darkest text
- **Neutral-950**: `#0a0a0a` - Very darkest text

## Semantic Color Variables

### Surface Colors
- **Surface**: `#ffffff` - Main surface
- **Surface-Secondary**: `#fafafa` - Secondary surface
- **Surface-Tertiary**: `#f5f5f5` - Tertiary surface
- **Surface-Elevated**: `#ffffff` - Elevated surface

## Component Classes

### Buttons
```css
.btn-primary          /* Primary action buttons - #8B5E3C */
.btn-secondary        /* Secondary action buttons - #5C4033 */
.btn-accent           /* Accent/CTA buttons - #D97A3E */
.btn-outline          /* Outline buttons */
.btn-ghost            /* Ghost buttons */
```

### Cards
```css
.card                 /* Standard cards */
.card-elevated        /* Elevated cards with stronger shadow */
```

### Forms
```css
.input-field          /* Standard input fields */
.input-field.error    /* Error state */
.input-field.success  /* Success state */
```

### Navigation
```css
.sidebar-item         /* Sidebar navigation items */
.sidebar-item.active  /* Active sidebar item */
.nav-link             /* Navigation links */
.nav-link.active      /* Active navigation link */
```

### Status Indicators
```css
.status-success       /* Success status */
.status-warning       /* Warning status */
.status-error         /* Error status */
.status-info          /* Info status */
```

### Gradients
```css
.gradient-bg-primary    /* Primary gradient background */
.gradient-bg-secondary  /* Secondary gradient background */
.gradient-bg-accent     /* Accent gradient background */
.gradient-text-primary  /* Primary gradient text */
.gradient-text-secondary /* Secondary gradient text */
```

## Usage Guidelines

### 1. Button Hierarchy
- **Primary buttons**: Use `btn-primary` (#8B5E3C) for main actions
- **Secondary buttons**: Use `btn-secondary` (#5C4033) for alternative actions
- **Accent buttons**: Use `btn-accent` (#D97A3E) for CTAs and important actions
- **Outline buttons**: Use `btn-outline` for less prominent actions
- **Ghost buttons**: Use `btn-ghost` for subtle actions

### 2. Text Hierarchy
- **Primary text**: Use `text-foreground` (#333333) for main content
- **Secondary text**: Use `text-foreground-secondary` (#666666) for supporting content
- **Tertiary text**: Use `text-foreground-tertiary` (#999999) for metadata
- **Muted text**: Use `text-foreground-muted` (#b0b0b0) for disabled/placeholder text

### 3. Background Usage
- **Main background**: Use `bg-background` (#F5F5F5) for app background
- **Surface background**: Use `bg-surface` (#ffffff) for cards and modals
- **Secondary background**: Use `bg-background-secondary` (#fafafa) for sections

### 4. Border Usage
- **Primary borders**: Use `border-border` (#b0b0b0) for main borders
- **Secondary borders**: Use `border-border-secondary` (#c0c0c0) for subtle borders
- **Tertiary borders**: Use `border-border-tertiary` (#d0d0d0) for very subtle borders

### 5. Status Communication
- **Success**: Use success colors for completed actions
- **Warning**: Use warning colors for attention needed
- **Error**: Use error colors for problems/issues
- **Info**: Use primary colors for informational content

### 6. Accessibility
- All color combinations meet WCAG 2.1 AA contrast requirements
- Focus states use `focus-ring` utility for consistent keyboard navigation
- Color is never the only indicator of state (includes icons, text, etc.)

### 7. Philippine Context
- Colors work well with Filipino cultural preferences
- High contrast for readability in various lighting conditions
- Professional appearance suitable for business use

## Implementation Examples

### Dashboard Card
```jsx
<div className="card">
  <h3 className="text-foreground font-semibold">Project Title</h3>
  <p className="text-foreground-secondary">Project description</p>
  <span className="status-success">Active</span>
</div>
```

### Form Input
```jsx
<input 
  className="input-field" 
  placeholder="Enter project name"
/>
```

### Action Button
```jsx
<button className="btn-primary">
  Create Project
</button>
```

### Navigation Item
```jsx
<button className="sidebar-item active">
  Dashboard
</button>
```

## Color Accessibility

### Contrast Ratios
- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text**: 3:1 minimum contrast ratio
- **UI components**: 3:1 minimum contrast ratio

### Color Blindness Considerations
- Never rely solely on color to convey information
- Use patterns, icons, and text labels
- Test with color blindness simulators

### High Contrast Mode
- Colors remain accessible in high contrast mode
- Focus indicators are clearly visible
- Text remains readable in all conditions

This minimalist color system provides a solid foundation for building a professional, elegant, and accessible platform for the Philippine design and construction industry. 