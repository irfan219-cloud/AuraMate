# 🎨 AuraMate Design Guide

## Color Palette

### Primary Aura Colors

```css
/* Soft Pastels - Main Palette */
--aura-pink:     #FFB5E8  /* Soft pink for warmth */
--aura-purple:   #DDA0DD  /* Gentle purple for calm */
--aura-blue:     #B4E4FF  /* Light blue for peace */
--aura-lavender: #E0BBE4  /* Lavender for serenity */
--aura-peach:    #FFDFD3  /* Peach for comfort */
--aura-mint:     #C7FFDA  /* Mint for freshness */
```

### Mood-Specific Gradients

```css
/* Happy Mood */
.mood-happy {
  background: linear-gradient(to bottom right, #FEF08A, #FCA5A5);
  /* Yellow-300 to Pink-300 */
}

/* Sad Mood */
.mood-sad {
  background: linear-gradient(to bottom right, #93C5FD, #C4B5FD);
  /* Blue-300 to Purple-300 */
}

/* Neutral Mood */
.mood-neutral {
  background: linear-gradient(to bottom right, #D1D5DB, #BAE6FD);
  /* Gray-300 to Blue-200 */
}
```

## Typography

### Font Stack
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Text Sizes
- **Hero Title**: 6xl (3.75rem) - 7xl (4.5rem)
- **Page Title**: 2xl (1.5rem)
- **Body Text**: base (1rem)
- **Small Text**: sm (0.875rem)

### Gradient Text Effect
```css
.gradient-text {
  background: linear-gradient(to right, #9333EA, #EC4899, #3B82F6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

## Glass Morphism

### Standard Glass Effect
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Usage
- Cards and containers
- Modal backgrounds
- Navigation elements
- Input fields

## Border Radius

### Rounded Corners
- **Full Round**: `rounded-full` - Pills and buttons
- **Extra Large**: `rounded-3xl` (1.5rem) - Cards
- **Large**: `rounded-2xl` (1rem) - Smaller cards
- **Medium**: `rounded-xl` (0.75rem) - Inputs

## Spacing System

### Consistent Spacing
- **Extra Small**: 0.5rem (2)
- **Small**: 1rem (4)
- **Medium**: 1.5rem (6)
- **Large**: 2rem (8)
- **Extra Large**: 4rem (16)

## Animations

### Floating Orbs
```javascript
animate={{
  x: [0, random(-50, 50), 0],
  y: [0, random(-50, 50), 0],
  scale: [1, 1.2, 1],
}}
transition={{
  duration: random(10, 20),
  repeat: Infinity,
  ease: "easeInOut",
}}
```

### Bloom Effect (Mood Blossoms)
```javascript
initial={{ scale: 0, rotate: 0, opacity: 0 }}
animate={{ scale: 1, rotate: 180, opacity: 1 }}
transition={{ 
  duration: 0.6,
  type: "spring",
  stiffness: 200,
  damping: 15
}}
```

### Hover Effects
```javascript
whileHover={{ scale: 1.05, y: -5 }}
whileTap={{ scale: 0.95 }}
```

## Component Patterns

### Button Styles

#### Primary Button
```jsx
<button className="glass-effect px-8 py-4 rounded-full 
                   text-lg font-medium text-gray-800 
                   hover:bg-white/60 transition-all">
  Button Text
</button>
```

#### Gradient Button
```jsx
<button className="bg-gradient-to-r from-purple-400 to-pink-400 
                   text-white px-8 py-4 rounded-full">
  Button Text
</button>
```

### Card Styles

#### Standard Card
```jsx
<div className="glass-effect rounded-3xl p-6">
  Card Content
</div>
```

#### Feature Card
```jsx
<div className="glass-effect p-6 rounded-3xl hover:y-[-5px]">
  <div className="w-16 h-16 rounded-2xl 
                  bg-gradient-to-br from-pink-400 to-purple-400 
                  flex items-center justify-center text-white mb-4">
    <Icon />
  </div>
  <h3>Title</h3>
  <p>Description</p>
</div>
```

## Icon Usage

### Lucide React Icons
- **Size**: w-5 h-5 (20px) for buttons
- **Size**: w-8 h-8 (32px) for features
- **Color**: Inherit from parent or use text-{color}

### Mood Icons
- **Happy**: `<Smile />` - Yellow/Pink gradient
- **Sad**: `<Cloud />` - Blue/Purple gradient
- **Neutral**: `<Heart />` - Gray/Teal gradient

## Layout Patterns

### Container
```jsx
<div className="container mx-auto px-4 py-8 max-w-4xl">
  Content
</div>
```

### Grid Layout
```jsx
<div className="grid md:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

### Flex Layout
```jsx
<div className="flex items-center justify-between">
  {/* Content */}
</div>
```

## Background Patterns

### Page Background
```jsx
<body className="bg-gradient-to-br 
                 from-aura-pink/20 
                 via-aura-lavender/20 
                 to-aura-blue/20 
                 min-h-screen">
```

### Floating Orbs Layer
```jsx
<div className="fixed inset-0 pointer-events-none overflow-hidden">
  {/* Animated orbs */}
</div>
```

## Accessibility

### Color Contrast
- Text on glass: Gray-800 (#1F2937)
- Text on gradients: White (#FFFFFF)
- Minimum contrast ratio: 4.5:1

### Focus States
```css
focus:outline-none focus:ring-4 focus:ring-purple-400
```

### Semantic HTML
- Use proper heading hierarchy (h1, h2, h3)
- Use semantic elements (nav, main, section)
- Include alt text for icons when meaningful

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
```jsx
<div className="text-4xl md:text-6xl">
  {/* Scales up on larger screens */}
</div>
```

## Design Principles

### 1. Soft & Calming
- Use pastel colors exclusively
- Avoid harsh contrasts
- Smooth, gentle animations

### 2. Glass & Transparency
- Layered depth with backdrop blur
- Semi-transparent elements
- Light, airy feel

### 3. Emotional Connection
- Warm, inviting colors
- Friendly, rounded shapes
- Empathetic visual language

### 4. Smooth Motion
- 60fps animations
- Easing functions for natural feel
- Purposeful, not distracting

### 5. Consistency
- Reusable components
- Consistent spacing
- Unified color palette

## Quick Reference

### Most Used Classes
```css
glass-effect          /* Frosted glass card */
gradient-text         /* Rainbow gradient text */
rounded-full          /* Circular buttons */
rounded-3xl           /* Card corners */
from-purple-400       /* Gradient start */
to-pink-400          /* Gradient end */
backdrop-blur-xl     /* Glass blur effect */
hover:scale-1.05     /* Hover grow */
transition-all       /* Smooth transitions */
```

### Most Used Colors
```css
text-gray-800        /* Primary text */
text-gray-600        /* Secondary text */
text-gray-500        /* Tertiary text */
bg-white/40          /* Glass background */
border-white/50      /* Glass border */
```

## Inspiration & Mood

**Keywords**: Soft, Calming, Empathetic, Lovable, Gentle, Warm, Peaceful, Serene, Comforting, Human

**Visual References**: 
- Pastel sunsets
- Soft clouds
- Blooming flowers
- Gentle water ripples
- Morning light through frosted glass

---

**Remember**: Every design decision should ask: "Does this feel lovable and empathetic?"
