import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'smart-search',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  bundles: [
    { components: ['ti-hack-search-box'] }
  ]
};
