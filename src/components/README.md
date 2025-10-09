# 🧬 Atomic Design System - Daily Routine Planner

This components directory follows the **Atomic Design Pattern** to create a scalable, maintainable, and reusable component architecture.

## 📁 Directory Structure

```
src/components/
├── atoms/           # Base components (smallest building blocks)
├── molecules/       # Simple combinations of atoms
├── organisms/       # Complex combinations of molecules and atoms
├── index.ts        # Main export file
└── README.md       # This file
```

## ⚛️ Atoms (Base Components)

**Location**: `src/components/atoms/`

These are the fundamental building blocks that import directly from React Native and third-party libraries.

### Available Atoms:

- **`Button`** - Customizable button with variants (primary, secondary, success, warning, error)
- **`Text`** - Typography component with variants (h1-h4, body, caption, small)
- **`Icon`** - Material Community Icons wrapper
- **`Card`** - Container component with elevation and styling
- **`Badge`** - Small status indicators
- **`Input`** - Text input with variants (outlined, underlined, filled)
- **`Loading`** - Activity indicator with optional text
- **`StarRating`** - Interactive star rating component
- **`ProgressBar`** - Progress indicator
- **`Switch`** - Toggle switch component

### Usage Example:
```tsx
import { Button, Text, Icon } from '@/components/atoms';

<Button variant="primary" size="large" onPress={handlePress}>
  <Icon name="check" size={20} />
  <Text variant="body" color="white">Complete</Text>
</Button>
```

## 🧪 Molecules (Component Combinations)

**Location**: `src/components/molecules/`

These components combine atoms to create more complex, reusable UI patterns.

### Available Molecules:

- **`QualityRater`** - Star rating with label for quality assessment
- **`StreakBadge`** - Habit streak display with fire icon and progress
- **`ScoreCard`** - Score display with progress indicators
- **`ActivityItem`** - List item for activities with status and quality
- **`NavigationButton`** - Button with icon for navigation
- **`TimingDisplay`** - Time display with formatting
- **`HabitTracker`** - Individual habit tracking component

### Usage Example:
```tsx
import { QualityRater, StreakBadge } from '@/components/molecules';

<QualityRater
  label="Prayer Quality"
  rating={4}
  onRatingChange={handleRatingChange}
/>

<StreakBadge
  habitName="Morning Prayer"
  currentStreak={15}
  target={30}
/>
```

## 🦠 Organisms (Complex Components)

**Location**: `src/components/organisms/`

These are complex components that combine molecules and atoms to create complete sections of the UI.

### Available Organisms:

- **`DashboardHeader`** - Main dashboard header with greeting and work type
- **`DisciplineScoreBoard`** - Complete discipline scoring display
- **`PrayersSection`** - Full prayer tracking section
- **`StreaksSection`** - Complete streaks display with multiple habits
- **`ZikrSection`** - Zikr tracking with progress
- **`QuranSection`** - Quran recitation tracking
- **`FamilyTimeSection`** - Family time quality tracking
- **`AnalyticsChart`** - Data visualization components
- **`TodayOverview`** - Daily overview dashboard
- **`HabitsGrid`** - Grid of habit tracking items

### Usage Example:
```tsx
import { DashboardHeader, PrayersSection } from '@/components/organisms';

<DashboardHeader
  greeting="Assalamu Alaikum"
  date="Friday, December 13, 2024"
  workType="wfh"
  overallScore={28}
  maxScore={32}
/>

<PrayersSection
  prayers={todayPrayers}
  onPrayerPress={handlePrayerPress}
  editable={true}
  onQualityChange={handleQualityChange}
/>
```

## 🎯 Design Principles

### 1. **Single Responsibility**
Each component has one clear purpose and responsibility.

### 2. **Composition Over Inheritance**
Components are built by combining smaller components rather than extending them.

### 3. **Prop Drilling Prevention**
Higher-level components handle data and pass only necessary props down.

### 4. **Consistent API**
Similar components share consistent prop naming and behavior patterns.

### 5. **Theme Integration**
All components integrate with the app's color and theme system.

## 📋 Import Rules

### ✅ Allowed Imports:

**Atoms can import from:**
- React & React Native
- Third-party libraries (react-native-elements, react-native-vector-icons, etc.)
- Constants and types (`@/constants`, `@/types`)

**Molecules can import from:**
- Atoms (`../atoms`)
- React & React Native (if needed)
- Constants and types

**Organisms can import from:**
- Atoms (`../atoms`)
- Molecules (`../molecules`)
- React & React Native (if needed)
- Constants and types

### ❌ Forbidden Imports:

- Atoms cannot import molecules or organisms
- Molecules cannot import organisms
- No circular dependencies

## 🔄 Component Lifecycle

1. **Create Atoms** - Build basic UI elements
2. **Combine into Molecules** - Create reusable patterns
3. **Assemble Organisms** - Build complete UI sections
4. **Export via Index** - Make available to screens

## 🎨 Styling Guidelines

### Colors
Use the centralized color system from `@/constants/Colors`:
```tsx
import { Colors } from '@/constants/Colors';

// Use theme colors
color: Colors.primary
backgroundColor: Colors.surface
```

### Typography
Use the Text atom for consistent typography:
```tsx
<Text variant="h3" color="primary" weight="bold">
  Title
</Text>
```

### Spacing
Follow 8px grid system:
- Small: 8px
- Medium: 16px  
- Large: 24px
- XL: 32px

## 🧪 Testing Strategy

Each component level should be tested:

- **Atoms**: Unit tests for props and rendering
- **Molecules**: Integration tests for atom combinations
- **Organisms**: Component tests for complete functionality

## 🔧 Development Workflow

1. **Start with Atoms** - Build the smallest reusable pieces
2. **Create Molecules** - Combine atoms for common patterns
3. **Build Organisms** - Assemble complete sections
4. **Update Exports** - Add to appropriate index files
5. **Document Usage** - Update this README with examples

## 📈 Benefits

- **Consistency**: Shared design language across the app
- **Reusability**: Components can be used in multiple contexts
- **Maintainability**: Changes propagate through the component hierarchy
- **Testability**: Small, focused components are easier to test
- **Scalability**: Easy to add new components following established patterns
- **Developer Experience**: Clear structure and predictable imports

## 🚀 Future Enhancements

- **Storybook Integration**: Visual component library
- **Design Tokens**: Centralized design system values
- **Animation Library**: Consistent animations across components
- **Accessibility**: Enhanced a11y support for all components
- **Theme Variants**: Dark mode and other theme options

---

**Remember**: The atomic design pattern helps us build consistent, maintainable, and scalable UI components. Always consider which level your component belongs to and follow the import rules!
