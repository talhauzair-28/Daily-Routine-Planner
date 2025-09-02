# Models Folder Structure

## Overview

The `src/models/` folder has been created to centralize all reusable interfaces, props, and enums in the Daily Routine Planner application. This provides better organization, maintainability, and type safety.

## Folder Structure

```
src/models/
├── index.ts              # Main export file - exports everything
├── enums/
│   ├── index.ts         # Enums index file
│   ├── Category.ts      # Islamic routine categories
│   ├── QualityLevel.ts  # Quality rating levels
│   ├── WorkType.ts      # Work day types
│   ├── PrayerName.ts    # Prayer names
│   ├── Size.ts          # Component sizes
│   ├── ButtonVariant.ts # Button variants
│   ├── BadgeVariant.ts  # Badge variants
│   ├── ProgressVariant.ts # Progress bar variants
│   ├── CardVariant.ts   # Card variants
│   ├── InputVariant.ts  # Input variants
│   ├── DisplayVariant.ts # Display variants
│   ├── Status.ts        # Activity statuses
│   ├── TimePeriod.ts    # Time periods
│   ├── DayOfWeek.ts     # Days of week
│   ├── IslamicMonth.ts  # Islamic months
│   ├── IslamicGreeting.ts # Islamic greetings
│   ├── AchievementLevel.ts # Achievement levels
│   ├── Grade.ts         # Achievement grades
│   ├── StreakMilestone.ts # Streak milestones
│   ├── IconSize.ts      # Icon sizes
│   └── SpacingSize.ts   # Spacing sizes
├── interfaces/
│   ├── index.ts         # Interfaces index file
│   ├── Prayer.ts        # Prayer interface
│   ├── ZikrSession.ts   # Zikr session interface
│   ├── QuranSession.ts  # Quran session interface
│   ├── LearningSession.ts # Learning session interface
│   ├── FamilyTime.ts    # Family time interface
│   ├── Exercise.ts      # Exercise interface
│   ├── DisciplineChallenge.ts # Discipline challenge interface
│   ├── DailyRecord.ts   # Daily record interface
│   ├── Streak.ts        # Streak interface
│   ├── WeeklyAnalysis.ts # Weekly analysis interface
│   ├── MonthlyAnalysis.ts # Monthly analysis interface
│   └── UserSettings.ts  # User settings interface
└── props/
    ├── index.ts         # Props index file
    ├── atoms/
    │   ├── index.ts     # Atom props index
    │   ├── Button.ts    # Button component props
    │   ├── Text.ts      # Text component props
    │   ├── Input.ts     # Input component props
    │   ├── Switch.ts    # Switch component props
    │   ├── Badge.ts     # Badge component props
    │   ├── ProgressBar.ts # Progress bar props
    │   ├── Icon.ts      # Icon component props
    │   ├── Card.ts      # Card component props
    │   ├── Loading.ts   # Loading component props
    │   └── StarRating.ts # Star rating props
    ├── molecules/
    │   ├── index.ts     # Molecule props index
    │   ├── ScoreCard.ts # Score card props
    │   ├── QualityRater.ts # Quality rater props
    │   ├── ActivityItem.ts # Activity item props
    │   └── StreakBadge.ts # Streak badge props
    └── organisms/
        ├── index.ts     # Organism props index
        ├── DashboardHeader.ts # Dashboard header props
        ├── DisciplineScoreBoard.ts # Discipline score board props
        ├── PrayersSection.ts # Prayers section props
        ├── StreaksSection.ts # Streaks section props
        ├── FamilyTimeSection.ts # Family time section props
        └── ExerciseSection.ts # Exercise section props
```

## What Was Moved

### 1. **Enums** (`src/models/enums/`)
- **Source**: `src/constants/enums.ts`
- **Content**: All application enums (Category, QualityLevel, WorkType, etc.)
- **Usage**: `import { Category, QualityLevel } from '@/models/enums';`

### 2. **Interfaces** (`src/models/interfaces/`)
- **Source**: `src/types/index.ts`
- **Content**: All data structure interfaces (Prayer, DailyRecord, Streak, etc.)
- **Usage**: `import { DailyRecord, Prayer } from '@/models/interfaces';`

### 3. **Props** (`src/models/props/`)
- **Source**: Individual component files
- **Content**: Component prop interfaces organized by atomic design level
- **Usage**: `import { ScoreCardProps } from '@/models/props/molecules';`

## Import Patterns

### Before (Old Structure)
```typescript
import { Category } from '@/constants/enums';
import { DailyRecord } from '@/types';
import { ScoreCardProps } from '@/components/molecules/ScoreCard';
```

### After (New Structure)
```typescript
// Import everything from models
import { Category, DailyRecord, ScoreCardProps } from '@/models';

// Or import specific categories
import { Category } from '@/models/enums';
import { DailyRecord } from '@/models/interfaces';
import { ScoreCardProps } from '@/models/props/molecules';
```

## Benefits

✅ **Centralized**: All models in one place
✅ **Organized**: Clear separation by type and atomic level
✅ **Maintainable**: Easy to find and update
✅ **Type Safe**: Full TypeScript support
✅ **Backward Compatible**: Old imports still work (legacy files)
✅ **Scalable**: Easy to add new models
✅ **Modular**: Each enum/interface in its own file
✅ **Searchable**: Easy to locate specific models
✅ **Collaborative**: Multiple developers can work on different models
✅ **Version Control**: Better diff tracking and conflict resolution

## Migration Guide

### For Components
1. **Update imports** to use `@/models` instead of individual files
2. **Use new prop interfaces** from the appropriate props file
3. **Import enums** from `@/models/enums`

### For Legacy Code
- Old imports will continue to work (backward compatibility)
- Legacy files show deprecation warnings
- Gradually migrate to new import patterns

### Example Migration
```typescript
// Before
import { Category } from '@/constants/enums';
import { DailyRecord } from '@/types';

// After
import { Category, DailyRecord } from '@/models';
```

## File Organization

### `src/models/index.ts`
- Main export file
- Re-exports commonly used types
- Provides convenient access to all models

### `src/models/enums/`
- **`index.ts`**: Central export point for all enums
- **Individual enum files**: Each enum in its own file (e.g., `Category.ts`, `QualityLevel.ts`)
- Better maintainability and easier to locate specific enums

### `src/models/interfaces/`
- **`index.ts`**: Central export point for all interfaces
- **Individual interface files**: Each interface in its own file (e.g., `Prayer.ts`, `DailyRecord.ts`)
- Prevents circular dependencies and improves code organization

### `src/models/props/`
- **`atoms/`**: Basic component props (Button, Text, Input, etc.)
  - **`index.ts`**: Central export point for atom props
  - **Individual prop files**: Each component prop in its own file (e.g., `Button.ts`, `Text.ts`)
- **`molecules/`**: Compound component props (ScoreCard, QualityRater, etc.)
  - **`index.ts`**: Central export point for molecule props
  - **Individual prop files**: Each component prop in its own file (e.g., `ScoreCard.ts`, `QualityRater.ts`)
- **`organisms/`**: Complex component props (DashboardHeader, PrayersSection, etc.)
  - **`index.ts`**: Central export point for organism props
  - **Individual prop files**: Each component prop in its own file (e.g., `DashboardHeader.ts`, `PrayersSection.ts`)

## Individual File Benefits

### **Enum Files**
- Single responsibility principle
- Easy to find and modify specific enums
- Better git diff tracking
- Reduced merge conflicts

### **Interface Files**
- Clear separation of concerns
- Easier to maintain complex interfaces
- Better code navigation
- Improved developer experience

### **Props Files**
- Component-specific prop definitions
- Easy to locate and modify component props
- Better collaboration on component development
- Clearer component API documentation
- Reduced merge conflicts in prop changes

## Best Practices

1. **Always import from `@/models`** for new code
2. **Use specific imports** when you only need certain types
3. **Keep prop interfaces** close to their component usage
4. **Update legacy imports** gradually
5. **Document new models** with JSDoc comments

## Future Enhancements

- Add validation schemas
- Include model versioning
- Add model testing utilities
- Create model generation tools
- Add model documentation generation
