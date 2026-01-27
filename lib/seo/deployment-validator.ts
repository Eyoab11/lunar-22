/**
 * Deployment SEO Validation
 * Validates SEO configuration before deployment and provides deployment-ready checks
 */

import { validateCompleteConfiguration, SEOValidationReport } from './config-validator';
import { getAllDiscoverablePages } from './sitemap-generator';
import { validatePageSEOCoverage } from './page-discovery';

export interface DeploymentValidationResult {
  isDeploymentReady: boolean;
  seoValidation: SEOValidationReport;
  deploymentChecks: {
    allPagesHaveMetadata: boolean;
    sitemapIsComplete: boolean;
    analyticsConfigured: boolean;
    socialMediaOptimized: boolean;
    performanceOptimized: boolean;
  };
  criticalIssues: string[];
  recommendations: string[];
}

export class DeploymentValidator {
  /**
   * Run complete deployment validation
   */
  async validateForDeployment(): Promise<DeploymentValidationResult> {
    console.log('🚀 Running deployment SEO validation...');
    
    // Run complete SEO validation
    const seoValidation = await validateCompleteConfiguration();
    
    // Run deployment-specific checks
    const deploymentChecks = await this.runDeploymentChecks();
    
    // Identify critical issues
    const criticalIssues = this.identifyCriticalIssues(seoValidation, deploymentChecks);
    
    // Generate deployment recommendations
    const recommendations = this.generateDeploymentRecommendations(seoValidation, deploymentChecks);
    
    // Determine if deployment is ready
    const isDeploymentReady = criticalIssues.length === 0 && seoValidation.errors.length === 0;
    
    return {
      isDeploymentReady,
      seoValidation,
      deploymentChecks,
      criticalIssues,
      recommendations,
    };
  }

  /**
   * Run deployment-specific checks
   */
  private async runDeploymentChecks() {
    const checks = {
      allPagesHaveMetadata: false,
      sitemapIsComplete: false,
      analyticsConfigured: false,
      socialMediaOptimized: false,
      performanceOptimized: false,
    };

    try {
      // Check page metadata coverage
      const coverage = await validatePageSEOCoverage();
      checks.allPagesHaveMetadata = coverage.unconfiguredPages.length === 0;

      // Check sitemap completeness
      const discoverablePages = await getAllDiscoverablePages();
      checks.sitemapIsComplete = discoverablePages.length > 0;

      // Check analytics configuration
      const { getGlobalSEOConfig } = require('./config');
      const globalConfig = getGlobalSEOConfig();
      checks.analyticsConfigured = !!globalConfig.analytics?.trackingId;

      // Check social media optimization
      checks.socialMediaOptimized = !!globalConfig.social?.defaultImage;

      // Check performance optimization
      checks.performanceOptimized = globalConfig.performance?.enableOptimization === true;

    } catch (error) {
      console.warn('Some deployment checks failed:', error);
    }

    return checks;
  }

  /**
   * Identify critical issues that block deployment
   */
  private identifyCriticalIssues(
    seoValidation: SEOValidationReport,
    deploymentChecks: any
  ): string[] {
    const critical: string[] = [];

    // Critical SEO errors
    seoValidation.errors.forEach(error => {
      if (this.isCriticalError(error)) {
        critical.push(error);
      }
    });

    // Critical deployment checks
    if (!deploymentChecks.allPagesHaveMetadata) {
      critical.push('Some pages lack SEO metadata configuration');
    }

    if (!deploymentChecks.analyticsConfigured) {
      critical.push('Analytics tracking is not configured');
    }

    if (!deploymentChecks.sitemapIsComplete) {
      critical.push('Sitemap generation is not working properly');
    }

    return critical;
  }

  /**
   * Check if an error is critical for deployment
   */
  private isCriticalError(error: string): boolean {
    const criticalPatterns = [
      'title is required',
      'description is required',
      'site url is required',
      'analytics tracking id is required',
      'failed to load',
    ];

    return criticalPatterns.some(pattern => 
      error.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  /**
   * Generate deployment-specific recommendations
   */
  private generateDeploymentRecommendations(
    seoValidation: SEOValidationReport,
    deploymentChecks: any
  ): string[] {
    const recommendations: string[] = [];

    // Add SEO recommendations
    recommendations.push(...seoValidation.recommendations);

    // Add deployment-specific recommendations
    if (!deploymentChecks.socialMediaOptimized) {
      recommendations.push('Configure social media optimization for better sharing');
    }

    if (!deploymentChecks.performanceOptimized) {
      recommendations.push('Enable performance optimization for better Core Web Vitals');
    }

    if (seoValidation.pageValidation.unconfiguredPages.length > 0) {
      recommendations.push(`Add SEO configuration for ${seoValidation.pageValidation.unconfiguredPages.length} unconfigured pages`);
    }

    // Remove duplicates
    return [...new Set(recommendations)];
  }

  /**
   * Print deployment validation report
   */
  printDeploymentReport(result: DeploymentValidationResult): void {
    console.log('\n🚀 Deployment Validation Report');
    console.log('================================');
    
    // Deployment readiness
    if (result.isDeploymentReady) {
      console.log('✅ Deployment Ready: YES');
    } else {
      console.log('❌ Deployment Ready: NO');
    }
    
    console.log('');

    // Critical issues
    if (result.criticalIssues.length > 0) {
      console.log('🚨 Critical Issues (must fix before deployment):');
      result.criticalIssues.forEach(issue => {
        console.log(`   • ${issue}`);
      });
      console.log('');
    }

    // Deployment checks
    console.log('📋 Deployment Checks:');
    console.log(`   Metadata Coverage: ${result.deploymentChecks.allPagesHaveMetadata ? '✅' : '❌'}`);
    console.log(`   Sitemap Complete: ${result.deploymentChecks.sitemapIsComplete ? '✅' : '❌'}`);
    console.log(`   Analytics Configured: ${result.deploymentChecks.analyticsConfigured ? '✅' : '❌'}`);
    console.log(`   Social Media Optimized: ${result.deploymentChecks.socialMediaOptimized ? '✅' : '❌'}`);
    console.log(`   Performance Optimized: ${result.deploymentChecks.performanceOptimized ? '✅' : '❌'}`);
    console.log('');

    // SEO validation summary
    console.log('📊 SEO Validation Summary:');
    console.log(`   Errors: ${result.seoValidation.errors.length}`);
    console.log(`   Warnings: ${result.seoValidation.warnings.length}`);
    console.log(`   Configured Pages: ${result.seoValidation.pageValidation.configuredPages.length}`);
    console.log(`   Unconfigured Pages: ${result.seoValidation.pageValidation.unconfiguredPages.length}`);
    console.log('');

    // Recommendations
    if (result.recommendations.length > 0) {
      console.log('💡 Recommendations:');
      result.recommendations.slice(0, 5).forEach(rec => {
        console.log(`   • ${rec}`);
      });
      if (result.recommendations.length > 5) {
        console.log(`   ... and ${result.recommendations.length - 5} more`);
      }
      console.log('');
    }
  }
}

// Export singleton instance
export const deploymentValidator = new DeploymentValidator();

// Export utility function
export async function validateForDeployment(): Promise<DeploymentValidationResult> {
  return deploymentValidator.validateForDeployment();
}

// CLI runner for deployment validation
export async function runDeploymentValidation(): Promise<number> {
  try {
    const result = await validateForDeployment();
    deploymentValidator.printDeploymentReport(result);
    
    return result.isDeploymentReady ? 0 : 1;
  } catch (error) {
    console.error('❌ Deployment validation failed:', error);
    return 1;
  }
}