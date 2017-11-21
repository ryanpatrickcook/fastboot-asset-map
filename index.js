/* eslint-env node */
'use strict';

let fs = require('fs');

module.exports = {
  name: 'fastboot-asset-map',

  postBuild(build) {
    this._super.included.apply(this, arguments);

    let files = fs.readdirSync(build.directory + '/assets');
    let totalFiles = files.length;

    let assetFileName = null;
    let fastbootFileName = null;
    let fastbootFileContent = undefined;
    let filesFound = 0;
    for (let i = 0; i < totalFiles; i++) {
      if (files[i].match(/^assetMap/i)) {
        assetFileName = files[i];
      }

      if (files[i].match(/\.js$/)) {
        let tmpFilePath = `${build.directory}/assets/${files[i]}`;
        if (fs.existsSync(tmpFilePath)) {
          let tmpContents = fs.readFileSync(tmpFilePath, {encoding: 'utf-8'});
          if (tmpContents.match(/__assetMapHash__/)) {
            fastbootFileName = tmpFilePath;
            fastbootFileContent = tmpContents;
          }
        }
      }
    }

    let assetFileNamePath = `${build.directory}/assets/${assetFileName}`;
    let assetMapPlaceholder = undefined;
    if (fs.existsSync(assetFileNamePath)) {
      assetMapPlaceholder = fs.readFileSync(assetFileNamePath, {encoding: 'utf-8'});
    }

    if (fs.existsSync(fastbootFileName)) {
      fs.writeFileSync(fastbootFileName, fastbootFileContent.replace(/__assetMapHash__/, assetMapPlaceholder));
    }
  }
};
