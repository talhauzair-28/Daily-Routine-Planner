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
