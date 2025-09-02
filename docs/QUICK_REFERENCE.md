# Quick Reference Guide
## Daily Routine Planner - Development Patterns

*Quick access to the most commonly used patterns, conventions, and code snippets.*

---

## Component Creation Checklist

- [ ] Create in appropriate atomic level (atoms/molecules/organisms)
- [ ] Add comprehensive JSDoc documentation
- [ ] Use TypeScript interfaces for props
- [ ] Import design system tokens (SPACING, Colors, etc.)
- [ ] Follow import organization standard
- [ ] Add to index.ts file for clean imports
- [ ] Use design system spacing instead of hardcoded values
- [ ] Apply consistent naming conventions

---

## Component Template

```typescript
/**
 * ComponentName (Atom/Molecule/Organism)
 *
 * Brief description of what the component does.
 *
 * @component
 * @example
 * <ComponentName
 *   title="Example Title"
 *   variant="default"
 *   onPress={() => {}}
 * />
 *
 * @usage Used in:
 * - ScreenA, ScreenB
 * - OrganismX, OrganismY
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Colors, SPACING, Size } from '@/constants/design';
import { helperFunction } from '@/utils';

import { Atom1, Atom2 } from '../atoms';

interface ComponentNameProps {
  /**
   * Primary title or label
   */
  title: string;

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: 'default' | 'compact';

  /**
   * Additional styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback function
   */
  onPress?: () => void;
}

const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  variant = 'default',
  style,
  onPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Component content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.MD,
    backgroundColor: Colors.surface,
  },
});

export default ComponentName;
```

---

## Import Organization

```typescript
// 1. React/React Native
import React from 'react';
import { View, StyleSheet } from 'react-native';

// 2. Third-party libraries
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

// 3. Path alias imports
import { Card, Text } from '@/components/atoms';
import { Colors, SPACING } from '@/constants/design';
import { helperFunction } from '@/utils';

// 4. Relative imports
import LocalComponent from './LocalComponent';
```

---

## Design System Usage

### Colors
```typescript
// ✅ Correct
backgroundColor: Colors.primary
color: Colors.textSecondary

// ❌ Avoid
backgroundColor: '#2E7D32'
color: 'gray'
```

### Spacing
```typescript
// ✅ Correct
marginTop: SPACING.MD        // 16px
padding: SPACING.SM          // 8px
gap: SPACING.XS             // 4px

// ❌ Avoid
marginTop: 16
padding: 8
gap: 4
```

### Typography
```typescript
// ✅ Correct
<Text variant="h1" color="primary">Title</Text>
<Text variant="body" color="textSecondary">Content</Text>

// ❌ Avoid
<Text style={{ fontSize: 32, fontWeight: 'bold' }}>Title</Text>
```

### Icons
```typescript
// ✅ Correct
<Icon size={ICON_SIZES.LG} />    // 24px
<Icon size={ICON_SIZES.MD} />    // 20px

// ❌ Avoid
<Icon size={24} />
<Icon size={20} />
```

---

## Common Patterns

### Render Method Extraction
```typescript
const ComplexComponent = () => {
  const renderHeader = (): JSX.Element => (
    <View style={styles.header}>
      {/* Header content */}
    </View>
  );

  const renderContent = (): JSX.Element => (
    <View style={styles.content}>
      {/* Content */}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};
```

### Conditional Rendering
```typescript
// Variant-based rendering
{variant === 'compact' && renderCompactView()}
{variant === 'default' && renderDefaultView()}

// Boolean-based rendering
{showProgress && <ProgressBar />}
{!loading ? renderContent() : <LoadingSpinner />}
```

### Helper Function Usage
```typescript
// Import helpers
import { getScoreColor, getQualityLevel } from '@/utils';

// Use in component
<Text color={getScoreColor(percentage)}>
  {score}
</Text>

<Badge variant={getQualityLevel(quality)}>
  {quality}
</Badge>
```

---

## Navigation Patterns

### Route Constants Usage
```typescript
// ✅ Correct - Type-safe navigation
import { ROUTES } from '@/navigation/routes';

navigation.navigate(ROUTES.PRAYER_DETAIL, { prayerId: 'fajr' });
navigation.navigate(ROUTES.ZIKR_DETAIL, { sessionId: 'morning-zikr' });
navigation.navigate(ROUTES.QURAN_DETAIL);

// ❌ Avoid - Hardcoded strings
navigation.navigate('PrayerDetail', { prayerId: 'fajr' });
navigation.navigate('ZikrDetail' as never, { sessionId: 'morning-zikr' } as never);
```

### Navigation Setup
```typescript
// src/navigation/AppNavigator.tsx
import { ROUTES } from './routes';

<Stack.Screen
  name={ROUTES.PRAYER_DETAIL}
  component={PrayerDetailScreen}
  options={{ title: 'Prayer Details' }}
/>

// Type the navigation hook
const navigation = useNavigation<NavigationProp<RootStackParamList>>();
```

---

## TypeScript Patterns

### Enum Usage
```typescript
// Import enums
import { Category, QualityLevel, Status } from '@/constants/enums';

// Use in interfaces
interface Record {
  category: Category;
  quality: QualityLevel;
  status: Status;
}

// Use in components
const category = Category.PRAYER;
const quality = QualityLevel.EXCELLENT;
```

### Props with Defaults
```typescript
interface Props {
  title: string;
  variant?: 'default' | 'compact';
  size?: Size;
  showIcon?: boolean;
}

const Component: React.FC<Props> = ({
  title,
  variant = 'default',
  size = Size.MEDIUM,
  showIcon = true,
}) => {
  // Component logic
};
```

---

## Styling Patterns

### Design System Styles
```typescript
const styles = StyleSheet.create({
  container: {
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    borderRadius: BORDER_RADIUS.LG,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.XS,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.SM,
  },
});
```

### Dynamic Styles
```typescript
// Color based on data
style={[
  styles.badge,
  { backgroundColor: getScoreColor(percentage) }
]}

// Conditional styles
style={[
  styles.container,
  variant === 'compact' && styles.compact,
  disabled && styles.disabled,
]}
```

---

## Common Commands

### Development
```bash
# Start development server
npm start

# Run on specific platform
npm run android
npm run ios

# Type checking
npx tsc --noEmit
```

### Code Quality
```bash
# Format code
npm run format

# Check formatting
npm run format:check

# Lint code
npm run lint

# Lint and format
npm run lint:format
```

### Component Generation
```bash
# Create new component structure
mkdir -p src/components/atoms/NewComponent
touch src/components/atoms/NewComponent/index.ts
touch src/components/atoms/NewComponent/NewComponent.tsx
```

---

## Debugging Tips

### TypeScript Errors
- Check import paths and spelling
- Verify enum values are correctly used
- Ensure all required props are provided
- Check for type mismatches in function returns

### Style Issues
- Verify design system imports
- Check if styles are applied correctly
- Use React Native Debugger for style inspection
- Validate spacing calculations

### Performance Issues
- Use React DevTools Profiler
- Check for unnecessary re-renders
- Verify memo usage on expensive components
- Review large list rendering

---

## File Naming Conventions

```
// Components
ComponentName.tsx           # PascalCase for components
index.ts                   # Lowercase for index files

// Utilities
helperFunctions.ts         # camelCase for utilities
index.ts                   # Export utilities

// Constants
Colors.ts                  # PascalCase for constants
enums.ts                   # Lowercase for grouped constants

// Screens
HomeScreen.tsx             # PascalCase with Screen suffix
```

---

## Git Commit Messages

```bash
# Format: type(scope): description

feat(components): add ScoreCard molecule component
fix(utils): correct getScoreColor percentage calculation
refactor(organisms): extract render methods in DashboardHeader
style(screens): apply design system spacing to HomeScreen
docs(guide): update component creation guidelines
test(utils): add unit tests for helper functions
```

---

## Useful VS Code Snippets

### React Component Snippet
```json
{
  "React Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "import { StyleSheet, View } from 'react-native';",
      "",
      "import { Colors, SPACING } from '@/constants/design';",
      "",
      "interface ${1:ComponentName}Props {",
      "  title: string;",
      "}",
      "",
      "const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({",
      "  title,",
      "}) => {",
      "  return (",
      "    <View style={styles.container}>",
      "      $0",
      "    </View>",
      "  );",
      "};",
      "",
      "const styles = StyleSheet.create({",
      "  container: {",
      "    padding: SPACING.MD,",
      "  },",
      "});",
      "",
      "export default ${1:ComponentName};"
    ]
  }
}
```

---

*Keep this guide handy for quick reference during development!*
