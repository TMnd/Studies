const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    //mfe1: 'http://localhost:4201/remoteEntry.js', //for static load
  },

  shared: {
    // Explicitly share packages:
    shared: share({
      '@angular/core': {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      },
      '@angular/common': {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      },
      '@angular/common/http': {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      },
      '@angular/router': {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      },
    }),
  },

  sharedMappings: ['auth-lib'],

});
