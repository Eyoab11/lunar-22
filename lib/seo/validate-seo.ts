#!/usr/bin/env node

/**
 * SEO Configuration Validation CLI Tool
 * Command-line tool for validating SEO configuration before deployment
 */

import { validateCompleteConfiguration, SEOValidationReport } from './config-validator';

interface ValidationOptions {
  verbose?: boolean;
  failOnWarnings?: boolean;
  outputFormat?: 'text' | 'json';
}

class SEOValidationCLI {
  /**
   * Run SEO validation with options
   */
  async run(options: ValidationOptions = {}): Promise<number> {
    const { verbose = false, failOnWarnings = false, outputFormat = 'text' } = options;

    try {
      console.log('🔍 Running SEO configuration validation...\n');
      
      const report = await validateCompleteConfiguration();
      
      if (outputFormat === 'json') {
        console.log(JSON.stringify(report, null, 2));
        return report.isValid ? 0 : 1;
      }

      // Text output format
      this.printTextReport(report, verbose);
      
      // Determine exit code
      const hasErrors = report.errors.length > 0;
      const hasWarnings = report.warnings.length > 0;
      
      if (hasErrors) {
        console.log('\n❌ SEO validation failed with errors');
        return 1;
      }
      
      if (hasWarnings && failOnWarnings) {
        console.log('\n⚠️  SEO validation failed due to warnings (--fail-on-warnings enabled)');
        return 1;
      }
      
      if (hasWarnings) {
        console.log('\n⚠️  SEO validation completed with warnings');
        return 0;
      }
      
      console.log('\n✅ SEO validation passed successfully');
      return 0;
      
    } catch (error) {
      console.error('❌ SEO validation failed with error:', error);
      return 1;
    }
  }

  /**
   * Print validation report in text format
   */
  private printTextReport(report: SEOValidationReport, verbose: boolean): void {
    // Summary
    console.log('📊 Validation Summary:');
    console.log(`   Errors: ${report.errors.length}`);
    console.log(`   Warnings: ${report.warnings.length}`);
    console.log(`   Configured Pages: ${report.pageValidation.configuredPages.length}`);
    console.log(`   Unconfigured Pages: ${report.pageValidation.unconfiguredPages.length}`);
    console.log(`   Missing Pages: ${report.pageValidation.missingPages.length}`);
    console.log('');

    // Errors
    if (report.errors.length > 0) {
      console.log('❌ Errors:');
      report.errors.forEach(error => {
        console.log(`   • ${error}`);
      });
      console.log('');
    }

    // Warnings
    if (report.warnings.length > 0) {
      console.log('⚠️  Warnings:');
      report.warnings.forEach(warning => {
        console.log(`   • ${warning}`);
      });
      console.log('');
    }

    // Page validation details
    if (verbose || report.pageValidation.unconfiguredPages.length > 0) {
      console.log('📄 Page Analysis:');
      
      if (report.pageValidation.configuredPages.length > 0) {
        console.log(`   ✅ Configured pages (${report.pageValidation.configuredPages.length}):`);
        report.pageValidation.configuredPages.forEach(page => {
          console.log(`      • ${page}`);
        });
      }
      
      if (report.pageValidation.unconfiguredPages.length > 0) {
        console.log(`   ⚠️  Unconfigured pages (${report.pageValidation.unconfiguredPages.length}):`);
        report.pageValidation.unconfiguredPages.forEach(page => {
          console.log(`      • ${page}`);
        });
      }
      
      if (report.pageValidation.missingPages.length > 0) {
        console.log(`   ❌ Missing pages (${report.pageValidation.missingPages.length}):`);
        report.pageValidation.missingPages.forEach(page => {
          console.log(`      • ${page}`);
        });
      }
      
      if (report.pageValidation.invalidConfigs.length > 0) {
        console.log(`   ❌ Invalid configurations (${report.pageValidation.invalidConfigs.length}):`);
        report.pageValidation.invalidConfigs.forEach(config => {
          console.log(`      • ${config.page}:`);
          config.errors.forEach(error => {
            console.log(`        - ${error}`);
          });
        });
      }
      
      console.log('');
    }

    // Recommendations
    if (report.recommendations.length > 0) {
      console.log('💡 Recommendations:');
      report.recommendations.forEach(rec => {
        console.log(`   • ${rec}`);
      });
      console.log('');
    }

    // Global config validation details
    if (verbose && (!report.globalConfigValidation.isValid || report.globalConfigValidation.warnings.length > 0)) {
      console.log('🌐 Global Configuration:');
      
      if (report.globalConfigValidation.errors.length > 0) {
        console.log('   ❌ Errors:');
        report.globalConfigValidation.errors.forEach(error => {
          console.log(`      • ${error}`);
        });
      }
      
      if (report.globalConfigValidation.warnings.length > 0) {
        console.log('   ⚠️  Warnings:');
        report.globalConfigValidation.warnings.forEach(warning => {
          console.log(`      • ${warning}`);
        });
      }
      
      console.log('');
    }
  }
}

/**
 * Parse command line arguments
 */
function parseArgs(): ValidationOptions {
  const args = process.argv.slice(2);
  const options: ValidationOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--verbose':
      case '-v':
        options.verbose = true;
        break;
      case '--fail-on-warnings':
        options.failOnWarnings = true;
        break;
      case '--json':
        options.outputFormat = 'json';
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
      default:
        console.error(`Unknown option: ${arg}`);
        printHelp();
        process.exit(1);
    }
  }

  return options;
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
SEO Configuration Validator

Usage: node validate-seo.js [options]

Options:
  --verbose, -v          Show detailed validation information
  --fail-on-warnings     Exit with error code if warnings are found
  --json                 Output results in JSON format
  --help, -h             Show this help message

Examples:
  node validate-seo.js                    # Basic validation
  node validate-seo.js --verbose          # Detailed validation
  node validate-seo.js --fail-on-warnings # Strict validation
  node validate-seo.js --json             # JSON output
`);
}

// Run CLI if this file is executed directly
if (require.main === module) {
  const options = parseArgs();
  const cli = new SEOValidationCLI();
  
  cli.run(options)
    .then(exitCode => {
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}

export { SEOValidationCLI };
export type { ValidationOptions };