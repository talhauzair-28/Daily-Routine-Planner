# 🛡️ **CODE QUALITY GUIDELINES - PREVENTING DUPLICATION MISTAKES**

## 📋 **CRITICAL RULES TO PREVENT DUPLICATION**

### **🚫 NEVER DUPLICATE - ALWAYS CENTRALIZE**

#### **1. 🔍 Before Writing Any Function - CHECK FIRST!**
```bash
# Search for similar functions before creating new ones
grep -r "functionName" src/
grep -r "similar logic pattern" src/
```

#### **2. 📦 Import Management Rules**
```typescript
// ❌ BAD: Importing unused types/enums
import { BadgeVariant, IconSize, Colors } from '@/constants/design';
// Only using Size

// ✅ GOOD: Import only what you use
import { Size } from '@/constants/design';
```

#### **3. 🎯 Function Creation Checklist**
Before creating ANY helper function, ask:
- [ ] Does this function already exist in `/src/utils/`?
- [ ] Is there similar logic in other components?
- [ ] Can this be generalized for reuse?
- [ ] Should this be in utilities instead of component-specific?

#### **4. 🔄 Redux Selector Rules - PREVENT UNWANTED RE-RENDERS**
```typescript
// ❌ BAD: Selecting entire slice causes re-renders on any slice change
const { todayRecord } = useSelector((state: RootState) => state.habits);
const { activeStreaks } = useSelector((state: RootState) => state.streaks);

// ✅ GOOD: Select only the specific property you need
const todayRecord = useSelector((state: RootState) => state.habits.todayRecord);
const activeStreaks = useSelector((state: RootState) => state.streaks.activeStreaks);
```

**Why this matters:**
- **Performance**: Component only re-renders when the specific data changes
- **Efficiency**: Prevents unnecessary renders when unrelated slice data updates
- **React-Redux best practice**: Select minimal data needed

#### **5. 🌟 Elevation & Shadow Rules - CONSISTENT CROSS-PLATFORM SHADOWS**
```typescript
// ❌ BAD: Hardcoded elevation values
const styles = StyleSheet.create({
  card: {
    elevation: 3, // Android only
    // Missing iOS shadow properties
  },
});

// ❌ BAD: Platform-specific shadow code
const styles = StyleSheet.create({
  card: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

// ✅ GOOD: Use standardized elevation system
import { ELEVATION } from '@/constants/design';

const styles = StyleSheet.create({
  card: {
    ...ELEVATION.CARD, // Works on both iOS and Android
  },
});
```

**Elevation Guidelines:**
- **ELEVATION.FLAT**: No shadow (text, icons, dividers)
- **ELEVATION.RAISED**: Minimal shadow (buttons in resting state)  
- **ELEVATION.LOW**: Low shadow (input fields)
- **ELEVATION.CARD**: Standard card shadow (most common for cards)
- **ELEVATION.BUTTON**: Button shadow (elevated buttons)
- **ELEVATION.FLOATING**: Floating elements (FAB, app bars)
- **ELEVATION.MODAL**: Modal/drawer shadow
- **ELEVATION.POPUP**: Highest shadow (tooltips, dropdowns)

### **🏗️ CENTRALIZATION STRATEGY**

#### **✅ When to Create Centralized Utilities**
1. **Function used in 2+ components** → Move to `/src/utils/helpers.ts`
2. **Business logic patterns** → Centralize immediately
3. **Islamic context functions** → Always centralize
4. **Color/styling calculations** → Use design system utilities
5. **Data formatting** → Centralize for consistency

#### **✅ Utility Categories**
```typescript
// /src/utils/helpers.ts structure
export const QualityUtils = {
  getColor: (rating: number) => { /* ... */ },
  getDescription: (rating: number, category?: string) => { /* ... */ },
  // ... other quality functions
};

export const StreakUtils = {
  getColor: (count: number) => { /* ... */ },
  getVariant: (count: number) => { /* ... */ },
  // ... other streak functions
};

export const IslamicUtils = {
  getPrayerIcon: (name: string) => { /* ... */ },
  formatTime: (time: string) => { /* ... */ },
  // ... other Islamic functions
};
```

## 🏗️ **ARCHITECTURAL PATTERNS**

### **📋 TEMPLATE SYSTEM - CONSISTENT UI COMPONENTS**

Templates provide reusable UI patterns that ensure consistency across screens while eliminating code duplication.

#### **🎯 Template Types & Usage**
```typescript
// ✅ GOOD: Use templates for consistent UI patterns
import {
  BaseScreen,           // Standard screen wrapper
  ScreenHeaderCard,     // Consistent headers  
  ScreenSection,        // Card-based sections
  CategoryCard,         // Category display cards
  PlaceholderScreen     // Unimplemented screens
} from '@/components/templates';
```

#### **🔗 Template Hierarchy**
1. **BaseScreen**: Foundation for all screens
   ```typescript
   // Provides: scrolling, padding, background, comment structure
   <BaseScreen showsVerticalScrollIndicator={false}>
     {children}
   </BaseScreen>
   ```

2. **ScreenHeaderCard**: Standardized headers
   ```typescript
   // Provides: greeting, date, context info with consistent styling
   <ScreenHeaderCard
     greeting="Assalamu Alaikum! 🌅"
     date={new Date().toISOString()}
     contextInfo={{
       text: "Weekend",
       icon: "home-heart", 
       color: Colors.family
     }}
   />
   ```

3. **ScreenSection**: Card-based content sections
   ```typescript
   // Provides: title, icon, consistent card styling
   <ScreenSection 
     title="Today's Progress" 
     icon="target" 
     iconColor={Colors.primary}
   >
     {content}
   </ScreenSection>
   ```

4. **CategoryCard**: Reusable category displays
   ```typescript
   // Eliminates duplicate category item code
   <CategoryCard
     label="Spiritual"
     icon="mosque"
     iconColor={Colors.spiritual}
     currentScore={9}
     maxScore={10}
     scoreColor={Colors.excellent}
   />
   ```

5. **PlaceholderScreen**: Unimplemented screens
   ```typescript
   // Consistent placeholder with proper structure
   <PlaceholderScreen
     title="Analytics Screen"
     description="Coming soon..."
     emoji="📊"
   />
   ```

#### **✅ Template Rules**
1. **ALWAYS use templates** instead of custom UI patterns
2. **BaseScreen** is mandatory for all screens
3. **ScreenSection** for any card-based content
4. **Consistent comment structure** in all components
5. **Props over hardcoded values** for flexibility

#### **❌ Template Anti-Patterns**
```typescript
// ❌ BAD: Custom screen wrapper
<ScrollView style={customStyles}>
  <View style={customContainer}>
    {content}
  </View>
</ScrollView>

// ❌ BAD: Hardcoded card sections  
<Card style={customCard}>
  <Text style={customTitle}>Section Title</Text>
  {content}
</Card>

// ❌ BAD: Duplicate category items
<View style={categoryItem}>
  <Icon name="mosque" />
  <Text>Spiritual</Text>
  <Text>9/10</Text>
</View>
```

### **📦 CONTAINER SYSTEM - PERFORMANCE OPTIMIZATION**

Containers isolate Redux state subscriptions and business logic to prevent unnecessary re-renders and improve performance.

#### **🏛️ Container Organization**
```typescript
// Screen-specific container organization
src/containers/
├── HomeScreenContainers/
│   ├── index.ts
│   ├── DisciplineScoreContainer.tsx
│   ├── CategoryBreakdownContainer.tsx
│   ├── ActiveStreaksContainer.tsx
│   └── QuickActionsContainer.tsx
├── TodayScreenContainers/          // Future screens
│   └── ...
└── SharedContainers/               // Cross-screen containers
    └── ...
```

#### **🎯 Container Types**

1. **State-Connected Containers**: Subscribe to specific Redux state
   ```typescript
   // ✅ GOOD: Isolated state subscription
   const DisciplineScoreContainer = ({ maxScore }) => {
     // Only subscribe to discipline state
     const dailyScores = useSelector(
       (state: RootState) => state.discipline.dailyScores
     );
     
     return (
       <ScreenSection title="Discipline Score">
         {/* Score logic and rendering */}
       </ScreenSection>
     );
   };
   ```

2. **Pure Presentation Containers**: No Redux subscriptions
   ```typescript
   // ✅ GOOD: Pure component with callbacks
   const QuickActionsContainer = ({ onNavigateToToday }) => {
     // No Redux state - pure presentation
     return (
       <ScreenSection title="Quick Actions">
         <Button onPress={onNavigateToToday} />
       </ScreenSection>
     );
   };
   ```

#### **🚀 Performance Benefits**
```typescript
// ❌ BAD: Monolithic screen with all state
const HomeScreen = () => {
  // ALL state subscriptions in one component
  const todayRecord = useSelector(state => state.habits.todayRecord);
  const activeStreaks = useSelector(state => state.streaks.activeStreaks);
  const dailyScores = useSelector(state => state.discipline.dailyScores);
  
  // ANY state change re-renders ENTIRE screen
  return (/* massive screen with all sections */);
};

// ✅ GOOD: Containerized sections with isolated state
const HomeScreen = () => {
  // Only minimal state for screen coordination
  const todayRecord = useSelector(state => state.habits.todayRecord);
  
  return (
    <BaseScreen>
      <ScreenHeaderCard {...headerProps} />
      {/* Each container manages its own state */}
      <DisciplineScoreContainer />    {/* Only discipline state */}
      <CategoryBreakdownContainer />  {/* Only discipline state */}
      <ActiveStreaksContainer />      {/* Only streaks state */}
      <QuickActionsContainer />       {/* No Redux state */}
    </BaseScreen>
  );
};
```

#### **✅ Container Rules**
1. **One concern per container** - single responsibility
2. **Minimal state subscriptions** - only what's needed
3. **Screen-specific organization** - group by screen
4. **Reusable across screens** when possible
5. **Templates for UI, containers for logic**

#### **🎭 Container Patterns**

1. **State Isolation Pattern**:
   ```typescript
   // Each container subscribes to minimal state
   const ScoreContainer = () => {
     const scores = useSelector(state => state.discipline.dailyScores);
     // Only re-renders when discipline scores change
   };
   
   const StreaksContainer = () => {
     const streaks = useSelector(state => state.streaks.activeStreaks);  
     // Only re-renders when streaks change
   };
   ```

2. **Callback Props Pattern**:
   ```typescript
   // Parent handles navigation, container handles presentation
   const ActionsContainer = ({ onNavigate }) => {
     return (
       <ScreenSection>
         <Button onPress={() => onNavigate('TODAY')} />
       </ScreenSection>
     );
   };
   ```

3. **Configuration Pattern**:
   ```typescript
   // Configurable containers for flexibility
   const CategoriesContainer = () => {
     const categories = [
       { key: 'spiritual', label: 'Spiritual', maxScore: 9 },
       { key: 'family', label: 'Family', maxScore: 4 },
     ];
   };
   ```

## 🔧 **IMPLEMENTATION STANDARDS**

### **📥 Import Organization (STRICT ORDER)**
```typescript
// 1. React/React Native
import React from 'react';
import { View, Text } from 'react-native';

// 2. Third-party libraries
import { Button } from 'react-native-elements';

// 3. Design system (centralized)
import { Colors, SPACING, Size } from '@/constants/design';

// 4. Utilities (centralized)
import { getQualityColor, formatTime } from '@/utils';

// 5. Types
import { Prayer, Habit } from '@/types';

// 6. Local components
import { Card, Badge } from '../atoms';
```

### **🎨 Component Function Rules**
```typescript
// ❌ BAD: Component-specific utility that could be reused
const MyComponent = () => {
  const getQualityColor = (rating: number) => {
    // This logic might be needed elsewhere!
  };
};

// ✅ GOOD: Use centralized utility
import { getQualityColor } from '@/utils';
const MyComponent = () => {
  // Use centralized function
  const color = getQualityColor(rating);
};
```

## 🚨 **RED FLAGS - DUPLICATION WARNING SIGNS**

### **⚠️ Immediate Action Required When You See:**
1. **Same function name** in multiple files
2. **Similar logic patterns** across components
3. **Copy-paste code** from other files
4. **Islamic context** scattered across components
5. **Color calculations** in multiple places
6. **Formatting functions** repeated

### **🔍 Regular Audit Commands**
```bash
# Find potential duplicates
grep -r "const get.*Color" src/components/
grep -r "const format" src/components/
grep -r "const get.*Variant" src/components/
grep -r "motivational" src/components/
grep -r "prayer.*icon" src/components/
```

## 📚 **CENTRALIZED UTILITIES REFERENCE**

### **🎯 Quality & Scoring**
```typescript
// ALWAYS use these instead of creating new ones
import {
  getQualityColor,      // For quality-based colors
  getQualityDescription, // For quality descriptions
  getScoreColor,        // For percentage-based colors
  getProgressVariant,   // For progress bar variants
  getScoreBadgeVariant  // For score badge variants
} from '@/utils';
```

### **🔥 Streak Management**
```typescript
// ALWAYS use these for streaks
import {
  getStreakColor,       // For streak-based colors
  getStreakVariant,     // For streak badge variants
  getStreakText,        // For streak display text
  getStreakMotivationalMessage // For streak celebrations
} from '@/utils';
```

### **🕌 Islamic Context**
```typescript
// ALWAYS use these for Islamic features
import {
  getPrayerIcon,        // For prayer-specific icons
  formatTime,           // For time formatting
  getMotivationalMessage // For Islamic motivational messages
} from '@/utils';
```

### **📐 Size & Layout**
```typescript
// ALWAYS use these for consistent sizing
import {
  sizeToIconSize,       // Convert Size to IconSize
  getNumericIconSize    // Get pixel values
} from '@/utils';
```

### **🌟 Elevation & Shadows**
```typescript
// ALWAYS use these for consistent cross-platform shadows
import {
  ELEVATION,            // Semantic elevation levels
  SHADOWS,              // Raw shadow values if needed
} from '@/constants/design';

// Usage examples:
...ELEVATION.CARD,      // Most common for cards
...ELEVATION.FLOATING,  // For FABs and app bars
...ELEVATION.MODAL,     // For modals and drawers
```

## 🎯 **DEVELOPMENT WORKFLOW**

### **✅ Before Creating Any Function:**
1. **Search existing utilities**: Check `/src/utils/helpers.ts`
2. **Search components**: `grep -r "similar pattern" src/`
3. **Check design system**: Look in `/src/constants/design/`
4. **Ask**: "Will this be used elsewhere?"

### **✅ When Adding New Functionality:**
1. **Start in utilities** if it might be reused
2. **Use TypeScript** for proper type safety
3. **Add JSDoc comments** for documentation
4. **Include Islamic context** where appropriate
5. **Test with multiple use cases**

### **✅ Code Review Checklist:**
- [ ] No duplicate functions across files
- [ ] All utilities properly imported
- [ ] No unused imports
- [ ] Consistent import order
- [ ] Islamic context preserved
- [ ] Type safety maintained
- [ ] No hardcoded elevation/shadow values - use ELEVATION system
- [ ] Cross-platform shadow compatibility ensured

## 🛠️ **TOOLS & AUTOMATION**

### **🔍 ESLint Rules (Recommended)**
```json
{
  "rules": {
    "no-duplicate-imports": "error",
    "import/no-duplicates": "error",
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external", 
        "internal",
        "parent",
        "sibling"
      ]
    }]
  }
}
```

### **🚨 Pre-commit Hooks**
```bash
# Check for potential duplicates before commit
grep -r "const get.*Color" src/components/ && echo "⚠️  Potential color function duplication!"
grep -r "const format" src/components/ && echo "⚠️  Potential format function duplication!"
```

## 📊 **MONITORING & MAINTENANCE**

### **🔄 Regular Cleanup Tasks**
- **Weekly**: Search for new duplicate patterns
- **Monthly**: Audit component functions for centralization opportunities
- **Before releases**: Full codebase duplicate scan

### **📈 Success Metrics**
- **Zero duplicate functions** across components
- **All utilities centralized** in `/src/utils/`
- **Consistent import patterns** across files
- **Islamic context preserved** and centralized

---

## 🤲 **Remember: Quality Code is Worship!**

**"And Allah loves those who are constantly repentant and loves those who purify themselves."** - Quran 2:222

Just as we purify ourselves spiritually, we must purify our code from duplication and maintain cleanliness in our development practices.

### **🌟 Golden Rules:**
1. **SEARCH BEFORE CREATE** - Always check existing utilities
2. **CENTRALIZE IMMEDIATELY** - Don't wait for "later"
3. **IMPORT ONLY NEEDED** - Keep imports clean
4. **DOCUMENT EVERYTHING** - Help your future self
5. **MAINTAIN ISLAMIC CONTEXT** - Preserve religious authenticity

**May Allah bless our efforts to write clean, maintainable code that serves the Muslim community!** 🕌
