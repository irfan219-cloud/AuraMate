# 📁 AuraMate File Structure

## Complete Project Tree

```
auramate/
│
├── 📄 START_HERE.md              ⭐ Read this first!
├── 📄 README.md                  Project overview
├── 📄 CHECKLIST.md               Pre-demo checklist
├── 📄 DEMO_SCRIPT.md             Presentation script
├── 📄 HACKATHON_PITCH.md         Pitch deck
├── 📄 INSTALL.md                 Installation guide
├── 📄 SETUP.md                   Quick setup
├── 📄 FEATURES.md                Feature showcase
├── 📄 DESIGN_GUIDE.md            Design system
├── 📄 PROJECT_SUMMARY.md         Technical summary
├── 📄 FILE_STRUCTURE.md          This file
│
├── 🚀 start.bat                  Windows quick start
│
├── ⚙️ Configuration Files
│   ├── package.json              Dependencies
│   ├── tsconfig.json             TypeScript config
│   ├── tailwind.config.ts        Tailwind + aura colors
│   ├── next.config.mjs           Next.js config
│   ├── postcss.config.mjs        PostCSS config
│   └── .gitignore                Git ignore rules
│
├── 📱 app/                       Next.js App Router
│   ├── page.tsx                  🏠 Landing page
│   ├── layout.tsx                Root layout
│   ├── globals.css               Global styles
│   │
│   ├── chat/                     💬 Chat feature
│   │   └── page.tsx              Chat interface
│   │
│   └── journal/                  📔 Mood journal
│       └── page.tsx              Journal interface
│
└── 🧩 components/                Reusable components
    ├── FloatingOrbs.tsx          Animated background
    ├── InspiringQuote.tsx        Random quotes
    └── MoodBlossom.tsx           Mood visualization
```

---

## 📄 Documentation Files

### Essential Reading (Priority Order)

1. **START_HERE.md** ⭐
   - Your starting point
   - Quick overview
   - Next steps

2. **README.md**
   - Project description
   - Features list
   - Quick start guide

3. **INSTALL.md**
   - Detailed installation
   - Troubleshooting
   - Testing procedures

4. **DEMO_SCRIPT.md**
   - Presentation flow
   - What to say
   - Timing guide

5. **CHECKLIST.md**
   - Pre-demo tasks
   - Testing checklist
   - Emergency backup

### Reference Documents

6. **HACKATHON_PITCH.md**
   - Problem/solution
   - Why you'll win
   - Future vision

7. **FEATURES.md**
   - Complete feature list
   - Demo scenarios
   - Technical highlights

8. **DESIGN_GUIDE.md**
   - Color palette
   - Component patterns
   - Design principles

9. **PROJECT_SUMMARY.md**
   - Technical overview
   - Architecture
   - Metrics

10. **SETUP.md**
    - Quick setup tips
    - Configuration
    - Deployment

---

## 🎨 Source Code Files

### Pages (app/)

#### `app/page.tsx` - Landing Page
- Hero section with animated heart
- Floating orbs background
- Feature cards (3 cards)
- CTA buttons
- Inspirational quote

**Key Features:**
- Gradient text effect
- Glass morphism cards
- Smooth animations
- Responsive grid

#### `app/chat/page.tsx` - Chat Interface
- Message history display
- Emotion detection
- AI response generation
- Voice input button
- Inspiring quote component

**Key Features:**
- Real-time sentiment analysis
- Animated messages
- Emotion indicators
- Glass morphism input

#### `app/journal/page.tsx` - Mood Journal
- Mood garden visualization
- Entry list with cards
- Add entry modal
- Date/time stamps

**Key Features:**
- Bloom animations
- Mood color coding
- Modal interactions
- Visual progress tracking

#### `app/layout.tsx` - Root Layout
- HTML structure
- Metadata
- Global background gradient
- Font configuration

#### `app/globals.css` - Global Styles
- Tailwind directives
- Custom utilities
- Glass effect class
- Gradient text class

---

### Components (components/)

#### `FloatingOrbs.tsx`
- 6 animated gradient orbs
- Random positioning
- Infinite floating animation
- Blur effects

**Props:** None (self-contained)

#### `InspiringQuote.tsx`
- Random quote selection
- Glass morphism card
- Sparkles icon
- Fade-in animation

**Props:** None (randomized)

#### `MoodBlossom.tsx`
- Mood visualization
- Bloom animation
- Size variants (sm/md/lg)
- Hover effects

**Props:**
- `mood`: 'happy' | 'sad' | 'neutral'
- `size`: 'sm' | 'md' | 'lg'
- `delay`: number

---

## ⚙️ Configuration Files

### `package.json`
- Project metadata
- Dependencies list
- Scripts (dev, build, start)
- Version numbers

**Key Dependencies:**
- next: ^14.2.0
- react: ^18.3.1
- framer-motion: ^11.0.0
- lucide-react: ^0.344.0
- tailwindcss: ^3.4.0

### `tsconfig.json`
- TypeScript compiler options
- Path aliases (@/*)
- Strict mode enabled
- Next.js plugin

### `tailwind.config.ts`
- Custom aura colors
- Extended animations
- Content paths
- Theme extensions

**Custom Colors:**
- aura-pink: #FFB5E8
- aura-purple: #DDA0DD
- aura-blue: #B4E4FF
- aura-lavender: #E0BBE4
- aura-peach: #FFDFD3
- aura-mint: #C7FFDA

### `next.config.mjs`
- Next.js configuration
- Build settings
- (Currently minimal)

### `postcss.config.mjs`
- PostCSS plugins
- Tailwind CSS
- Autoprefixer

---

## 🚀 Executable Files

### `start.bat` (Windows)
- Checks for node_modules
- Runs npm install if needed
- Starts development server
- Opens browser automatically

**Usage:** Double-click to run

---

## 📊 File Statistics

| Category | Count | Lines of Code |
|----------|-------|---------------|
| Pages | 3 | ~400 |
| Components | 3 | ~150 |
| Config Files | 6 | ~100 |
| Documentation | 11 | ~2000 |
| **Total** | **23** | **~2650** |

---

## 🎯 File Purpose Quick Reference

### Need to...

**Start the app?**
→ `start.bat` or `npm run dev`

**Understand the project?**
→ `START_HERE.md` → `README.md`

**Prepare for demo?**
→ `DEMO_SCRIPT.md` → `CHECKLIST.md`

**Customize colors?**
→ `tailwind.config.ts`

**Add new features?**
→ `app/` folder

**Modify design?**
→ `DESIGN_GUIDE.md` → `components/`

**Fix issues?**
→ `INSTALL.md` (troubleshooting section)

**Understand tech stack?**
→ `PROJECT_SUMMARY.md`

---

## 🔍 Code Navigation Tips

### Finding Specific Features

**Emotion Detection Logic**
→ `app/chat/page.tsx` → `detectEmotion()` function

**Mood Garden Visualization**
→ `app/journal/page.tsx` → Mood Garden section

**Floating Orbs Animation**
→ `components/FloatingOrbs.tsx`

**Glass Morphism Effect**
→ `app/globals.css` → `.glass-effect` class

**Color Palette**
→ `tailwind.config.ts` → `colors.aura`

**Gradient Text**
→ `app/globals.css` → `.gradient-text` class

---

## 📝 Notes

- All TypeScript files use strict mode
- All components are client-side ('use client')
- Animations use Framer Motion
- Icons from Lucide React
- Styling with Tailwind CSS utility classes
- No external API calls (demo mode)

---

## 🎨 Design System Location

All design tokens and patterns are documented in:
- `DESIGN_GUIDE.md` - Complete design system
- `tailwind.config.ts` - Color and animation config
- `app/globals.css` - Utility classes

---

## 🚀 Deployment Files

When deploying, you'll need:
- ✅ All files in `app/`
- ✅ All files in `components/`
- ✅ All config files
- ✅ `package.json`
- ❌ Documentation files (optional)
- ❌ `start.bat` (development only)

---

**Quick Tip:** Use Ctrl+P (or Cmd+P on Mac) in VS Code to quickly jump to any file!
