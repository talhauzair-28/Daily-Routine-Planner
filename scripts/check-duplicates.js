#!/usr/bin/env node

/**
 * Duplicate Function Detection Script
 *
 * Scans the codebase for potential duplicate functions and patterns
 * that should be centralized in utilities.
 *
 * Usage: node scripts/check-duplicates.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const COLORS = {
  RED: '\x1b[31m',
  YELLOW: '\x1b[33m',
  GREEN: '\x1b[32m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m',
};

const PATTERNS_TO_CHECK = [
  {
    name: 'Quality Color Functions',
    pattern: 'const get.*[Qq]uality.*[Cc]olor',
    description: 'Should use getQualityColor from @/utils',
  },
  {
    name: 'Score Color Functions',
    pattern: 'const get.*[Ss]core.*[Cc]olor',
    description: 'Should use getScoreColor from @/utils',
  },
  {
    name: 'Streak Functions',
    pattern: 'const get.*[Ss]treak',
    description: 'Should use streak utilities from @/utils',
  },
  {
    name: 'Motivational Message Functions',
    pattern: 'const get.*[Mm]otivational',
    description: 'Should use getMotivationalMessage from @/utils',
  },
  {
    name: 'Format Time Functions',
    pattern: 'const format.*[Tt]ime',
    description: 'Should use formatTime from @/utils',
  },
  {
    name: 'Prayer Icon Functions',
    pattern: 'const get.*[Pp]rayer.*[Ii]con',
    description: 'Should use getPrayerIcon from @/utils',
  },
  {
    name: 'Progress Variant Functions',
    pattern: 'const get.*[Pp]rogress.*[Vv]ariant',
    description: 'Should use getProgressVariant from @/utils',
  },
];

const IMPORT_PATTERNS = [
  {
    name: 'Unused Badge Imports',
    pattern: 'import.*BadgeVariant.*from.*@/constants',
    description: 'Check if BadgeVariant is actually used',
  },
  {
    name: 'Unused Color Imports',
    pattern: 'import.*Colors.*from.*@/constants',
    description:
      'Check if Colors is actually used (might be available via utils)',
  },
  {
    name: 'Duplicate Design Imports',
    pattern: 'import.*{[^}]*Size[^}]*Size[^}]*}',
    description: 'Possible duplicate Size imports',
  },
];

function searchPattern(pattern, directory = 'src') {
  try {
    const result = execSync(
      `grep -r "${pattern}" ${directory}/ 2>/dev/null || true`,
      { encoding: 'utf8' }
    );
    return result
      .trim()
      .split('\n')
      .filter(line => line.length > 0);
  } catch (error) {
    return [];
  }
}

function checkDuplicatePatterns() {
  console.log(
    `${COLORS.BOLD}${COLORS.BLUE}🔍 Checking for Duplicate Functions...${COLORS.RESET}\n`
  );

  let issuesFound = 0;

  PATTERNS_TO_CHECK.forEach(({ name, pattern, description }) => {
    const matches = searchPattern(pattern);

    if (matches.length > 0) {
      console.log(`${COLORS.RED}⚠️  ${name}:${COLORS.RESET}`);
      console.log(`   ${COLORS.YELLOW}${description}${COLORS.RESET}`);
      matches.forEach(match => {
        console.log(`   📁 ${match}`);
      });
      console.log('');
      issuesFound++;
    }
  });

  return issuesFound;
}

function checkImportIssues() {
  console.log(
    `${COLORS.BOLD}${COLORS.BLUE}📦 Checking Import Issues...${COLORS.RESET}\n`
  );

  let issuesFound = 0;

  // Check for unused imports
  const componentFiles = execSync(
    'find src/components -name "*.tsx" 2>/dev/null || true',
    { encoding: 'utf8' }
  )
    .trim()
    .split('\n')
    .filter(f => f.length > 0);

  componentFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');

      // Check for unused BadgeVariant
      if (
        content.includes('BadgeVariant') &&
        content.includes('import') &&
        !content.includes('BadgeVariant.')
      ) {
        console.log(
          `${COLORS.YELLOW}⚠️  Potentially unused BadgeVariant import:${COLORS.RESET}`
        );
        console.log(`   📁 ${file}`);
        issuesFound++;
      }

      // Check for unused Colors
      if (
        content.includes('import.*Colors') &&
        !content.includes('Colors[') &&
        !content.includes('Colors.')
      ) {
        const colorUsagePattern = /Colors\s*\[|\bColors\./;
        if (!colorUsagePattern.test(content)) {
          console.log(
            `${COLORS.YELLOW}⚠️  Potentially unused Colors import:${COLORS.RESET}`
          );
          console.log(`   📁 ${file} (might be available via utils)`);
          issuesFound++;
        }
      }
    } catch (error) {
      // Skip files that can't be read
    }
  });

  return issuesFound;
}

function checkUtilsUsage() {
  console.log(
    `${COLORS.BOLD}${COLORS.BLUE}🛠️  Checking Utils Usage...${COLORS.RESET}\n`
  );

  const utilsImports = searchPattern('from.*@/utils');
  const componentFiles = execSync(
    'find src/components -name "*.tsx" 2>/dev/null || true',
    { encoding: 'utf8' }
  )
    .trim()
    .split('\n')
    .filter(f => f.length > 0);

  const filesWithoutUtils = componentFiles.filter(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      return (
        !content.includes('@/utils') &&
        (content.includes('getQuality') ||
          content.includes('getScore') ||
          content.includes('getStreak') ||
          content.includes('formatTime') ||
          content.includes('getPrayer'))
      );
    } catch {
      return false;
    }
  });

  if (filesWithoutUtils.length > 0) {
    console.log(
      `${COLORS.YELLOW}📋 Files that might benefit from utils:${COLORS.RESET}`
    );
    filesWithoutUtils.forEach(file => {
      console.log(`   📁 ${file}`);
    });
    console.log('');
  }

  console.log(
    `${COLORS.GREEN}✅ Files using utils: ${utilsImports.length}${COLORS.RESET}`
  );
  console.log(
    `${COLORS.BLUE}📊 Total component files: ${componentFiles.length}${COLORS.RESET}\n`
  );
}

function generateReport() {
  console.log(
    `${COLORS.BOLD}${COLORS.GREEN}🎯 DUPLICATE DETECTION REPORT${COLORS.RESET}`
  );
  console.log('='.repeat(50));
  console.log('');

  const duplicateIssues = checkDuplicatePatterns();
  const importIssues = checkImportIssues();

  checkUtilsUsage();

  console.log('='.repeat(50));

  if (duplicateIssues === 0 && importIssues === 0) {
    console.log(
      `${COLORS.GREEN}${COLORS.BOLD}🎉 No duplication issues found!${COLORS.RESET}`
    );
    console.log(
      `${COLORS.GREEN}Your codebase follows good centralization practices.${COLORS.RESET}`
    );
  } else {
    console.log(`${COLORS.RED}${COLORS.BOLD}⚠️  Issues found:${COLORS.RESET}`);
    console.log(`   🔄 Potential duplicates: ${duplicateIssues}`);
    console.log(`   📦 Import issues: ${importIssues}`);
    console.log('');
    console.log(
      `${COLORS.YELLOW}📚 Please review the CODE_QUALITY_GUIDELINES.md for best practices.${COLORS.RESET}`
    );
  }

  console.log('');
  console.log(
    `${COLORS.BLUE}💡 Run this script regularly to maintain code quality!${COLORS.RESET}`
  );
}

// Run the report
generateReport();
