/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': 'app', // 'dist',

    '@angular': 'node_modules/@angular',
    '@angular/animations': 'node_modules/@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': 'node_modules/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': 'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    'rxjs': 'node_modules/rxjs',
    'time-ago-pipe':'node_modules/time-ago-pipe',
    'ng2-socket-io': 'node_modules/ng2-socket-io',
    'socket.io-client': 'node_modules/socket.io-client'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'time-ago-pipe': {main: 'time-ago-pipe.js'},
    'ng2-socket-io': {main: 'index.js'},
    'socket.io-client': {main: 'socket.io.js'}
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);
