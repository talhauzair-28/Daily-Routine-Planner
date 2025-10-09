# 🎨 Design System - Daily Routine Planner

## 📋 Overview

The Daily Routine Planner uses a comprehensive design system based on **atomic design principles** with centralized design tokens for colors, typography, and dimensions. This ensures consistency, maintainability, and scalability across the entire application.

## 🏗️ Architecture

```
src/constants/design/
├── BaseColors.ts      # Fundamental color palette
├── Typography.ts      # Font families, sizes, and styles
├── Dimensions.ts      # Spacing, icons, borders, shadows
└── index.ts          # Central export point

src/constants/
└── Colors.ts         # Application colors using base colors

src/components/
├── atoms/            # Design system integrated components
├── molecules/        # Component combinations
└── organisms/        # Complex UI sections
```

## 🎨 Color System

### Base Colors (`BaseColors.ts`)
- **Primary Colors**: Islamic green theme (`GREEN_500`, `GREEN_400`, etc.)
- **Secondary Colors**: Complementary blue palette
- **Semantic Colors**: Success, warning, error, info
- **Neutral Colors**: Grays for text and backgrounds (50-900 scale)
- **Religious Colors**: Special colors for Islamic features
- **Quality Colors**: Star rating color system

### Application Colors (`Colors.ts`)
All application colors derive from base colors:
```typescript
// ✅ Using design system
color: Colors.primary
backgroundColor: Colors.surface

// ❌ Avoid hardcoded colors
color: '#2E7D32'
backgroundColor: '#FAFAFA'
```

## ✏️ Typography System

### Font Families
- **PRIMARY**: System default font
- **ARABIC**: For Arabic/Islamic text
- **MONOSPACE**: For code/numbers

### Typography Variants
```typescript
// Headings
h1, h2, h3, h4, h5, h6

// Body text
bodyLarge, body, bodySmall

// UI text
button, buttonLarge, buttonSmall
label, input, tab, badge, caption

// Arabic text
quranArabic, prayerArabic, zikrArabic
```

### Usage Example
```typescript
import { TYPOGRAPHY } from '@/constants/design/Typography';

// ✅ Using typography system
<Text variant="h3" color="primary">Title</Text>

// ❌ Avoid hardcoded styles
<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Title</Text>
```

## 📏 Dimensions System

### Spacing (8px Grid System)
```typescript
SPACING = {
  NONE: 0,
  XS: 4,    // 0.5 * 8
  SM: 8,    // 1 * 8
  MD: 16,   // 2 * 8
  LG: 24,   // 3 * 8
  XL: 32,   // 4 * 8
  // ... up to 5XL: 64
}
```

### Icon Sizes
```typescript
ICON_SIZES = {
  XS: 12,
  SM: 16,
  MD: 20,   // Default
  LG: 24,
  XL: 32,
  // ... up to 5XL: 64
}
```

### Component Dimensions
Predefined dimensions for consistent component sizing:
- **BUTTON**: Heights, padding for different sizes
- **INPUT**: Standard input field dimensions
- **CARD**: Padding, margins, border radius
- **BADGE**: Sizes and padding
- **RELIGIOUS**: Prayer cards, zikr counters, streak badges

### Usage Example
```typescript
import { SPACING, ICON_SIZES, BORDER_RADIUS } from '@/constants/design/Dimensions';

// ✅ Using dimensions system
paddingHorizontal: SPACING.MD,
borderRadius: BORDER_RADIUS.LG,
<Icon size="LG" />

// ❌ Avoid hardcoded dimensions
paddingHorizontal: 16,
borderRadius: 12,
<Icon size={24} />
```

## 🧬 Component Integration

### Atoms (Design System Integrated)
All atom components now use the design system:

#### Text Component
```typescript
<Text variant="h3" color="primary">
  Islamic Greeting
</Text>
```

#### Icon Component
```typescript
<Icon name="mosque" size="LG" color="prayer" />
```

#### Button Component
```typescript
<Button variant="primary" size="large">
  Start Prayer
</Button>
```

### Component Annotations
All components include comprehensive JSDoc annotations:
- **@component** - Component description
- **@example** - Usage examples
- **@usage** - Where the component is used
- **@param** - Parameter descriptions
- **@returns** - Return type
- **@interface** - Props interface documentation

## 📱 Islamic/Religious Design Elements

### Special Color Mappings
```typescript
Colors.prayer    // Prayer times
Colors.quran     // Quran recitation
Colors.zikr      // Zikr sessions
Colors.streak    // Habit streaks
Colors.gold      // Special occasions
```

### Religious Dimensions
```typescript
RELIGIOUS_DIMENSIONS = {
  PRAYER_CARD: { HEIGHT: 80, ICON_SIZE: 24 },
  ZIKR_COUNTER: { SIZE: 120, BORDER_WIDTH: 4 },
  STREAK_BADGE: { HEIGHT: 32, ICON_SIZE: 16 },
  QUALITY_RATING: { STAR_SIZE: 20, SPACING: 4 }
}
```

### Arabic Typography
```typescript
ARABIC_TYPOGRAPHY = {
  quranArabic: { fontSize: 18, textAlign: 'right' },
  prayerArabic: { fontSize: 16, textAlign: 'right' },
  zikrArabic: { fontSize: 14, textAlign: 'center' }
}
```

## 🔧 Implementation Status

### ✅ Completed
- [x] Base color palette with Islamic theme
- [x] Typography system with Arabic support
- [x] Dimensions system with 8px grid
- [x] Updated Colors.ts to use base colors
- [x] Text atom with design system integration
- [x] Icon atom with standardized sizing
- [x] Button atom with consistent styling
- [x] Comprehensive JSDoc annotations
- [x] TypeScript type safety throughout

### 🚧 In Progress
- [ ] Update remaining atom components (Card, Badge, Input, etc.)
- [ ] Update molecule components to use design system
- [ ] Update organism components to use design system
- [ ] Replace all hardcoded values in screens

### 📋 Next Steps
1. **Update All Atoms**: Apply design system to remaining atom components
2. **Update Molecules**: Integrate design system in molecule components
3. **Update Organisms**: Ensure organisms use design system tokens
4. **Screen Integration**: Update all screens to use design system
5. **Remove Hardcoded Values**: Eliminate all hardcoded colors, sizes, fonts

## 🎯 Benefits Achieved

### 1. **Consistency**
- Unified color palette across the app
- Standardized typography and spacing
- Consistent component behavior

### 2. **Maintainability**
- Centralized design tokens
- Easy theme updates
- Reduced code duplication

### 3. **Scalability**
- Easy to add new components
- Consistent patterns for new features
- Type-safe design system

### 4. **Islamic Identity**
- Thoughtful color choices for Islamic app
- Arabic typography support
- Religious-specific design elements

### 5. **Developer Experience**
- Comprehensive documentation
- Type-safe component props
- Clear usage examples

## 📚 Usage Guidelines

### Do's ✅
- Always use design system tokens
- Follow atomic design principles
- Add comprehensive annotations
- Use semantic color names
- Follow 8px grid system

### Don'ts ❌
- Don't use hardcoded colors
- Don't use arbitrary font sizes
- Don't ignore spacing system
- Don't skip component annotations
- Don't create one-off styles

## 🔮 Future Enhancements

### Planned Features
- **Dark Mode Support**: Complete dark theme implementation
- **Theme Switching**: Runtime theme switching capability
- **Animation System**: Consistent animations and transitions
- **Accessibility**: Enhanced a11y support
- **Storybook**: Visual component documentation

### Advanced Features
- **Design Tokens Export**: JSON export for design tools
- **Theme Customization**: User customizable themes
- **Component Variants**: Extended component variations
- **Responsive System**: Screen size responsive tokens

---

## 📖 Quick Reference

### Import Patterns
```typescript
// Design system tokens
import { Colors } from '@/constants/Colors';
import { TYPOGRAPHY, SPACING, ICON_SIZES } from '@/constants/design';

// Components
import { Text, Icon, Button } from '@/components/atoms';
import { QualityRater, StreakBadge } from '@/components/molecules';
```

### Common Patterns
```typescript
// Text with design system
<Text variant="h4" color="primary">Title</Text>

// Icon with standard sizing
<Icon name="mosque" size="LG" color="prayer" />

// Button with consistent styling
<Button variant="success" size="large">Complete</Button>

// Spacing with grid system
style={{ 
  padding: SPACING.MD, 
  marginBottom: SPACING.LG 
}}
```

---

**The design system provides a solid foundation for building consistent, maintainable, and beautiful Islamic-centered user interfaces in the Daily Routine Planner app.**
