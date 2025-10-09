# Import Order Standardization Guide

## Import Order Pattern

1. **React/React Native imports**
   ```typescript
   import React from 'react';
   import { View, Text, StyleSheet } from 'react-native';
   ```

2. **Third-party library imports**
   ```typescript
   import { Button } from 'react-native-elements';
   import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
   ```

3. **Path alias imports (@/ imports)**
   ```typescript
   import { Colors } from '@/constants/Colors';
   import { TYPOGRAPHY, Size, Variant } from '@/constants/design';
   import { Prayer } from '@/types';
   ```

4. **Relative path imports**
   ```typescript
   import { Text, Icon, Button } from '../atoms';
   import { QualityRater } from '../molecules';
   ```

## Enum Usage Patterns

### Replace string literals with enums:

```typescript
// ❌ Before
variant?: 'primary' | 'secondary' | 'success';
size?: 'small' | 'medium' | 'large';

// ✅ After  
variant?: Variant.PRIMARY | Variant.SECONDARY | Variant.SUCCESS;
size?: Size;
```

### Component Categories:
```typescript
// ❌ Before
category?: 'prayer' | 'quran' | 'zikr';

// ✅ After
category?: Category.PRAYER | Category.QURAN | Category.ZIKR;
```

### Quality Levels:
```typescript
// ❌ Before
if (quality >= 4) return 'excellent';

// ✅ After
if (quality >= QualityLevel.GOOD) return QualityDescription.EXCELLENT;
```
