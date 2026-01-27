#!/usr/bin/env tsx

/**
 * Deployment validation script
 */

import { runDeploymentValidation } from '../lib/seo/deployment-validator';

runDeploymentValidation()
  .then(exitCode => {
    process.exit(exitCode);
  })
  .catch(error => {
    console.error('Deployment validation failed:', error);
    process.exit(1);
  });