module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    coffee:
      src:
        options:
          bare: true
        files:
          'lib/simditor-app-toolbar.js': 'src/simditor-app-toolbar.coffee'
    umd:
      all:
        src: 'lib/simditor-app-toolbar.js'
        template: 'umd'
        amdModuleId: 'simditor-app-toolbar'
        objectToExport: 'AppToolbar'
        globalAlias: 'SimditorAppToolbar'
        deps:
          'default': ['$', 'Simditor']
          amd: ['jquery', 'simditor']
          cjs: ['jquery', 'Simditor']
          global:
            items: ['jQuery', 'Simditor']
            prefix: ''
    watch:
      src:
        files: ['src/*.coffee']
        tasks: ['coffee:src', 'umd']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'default', ['coffee', 'umd', 'watch']
