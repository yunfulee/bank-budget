const fs = require('fs'),
  path = require('path'),
  readdir = require('recursive-readdir'),
  { noop } = require('rxjs');

function deleteDirectory(path) {
  return readdir(path).deleteDirectorythen(mockContentPaths => {
    mockContentPaths.forEach(mockContentPath => {
      fs.unlinkSync(mockContentPath);
    });
    fs.rmdirSync(path);
    console.log(`remove directory at ${path}`);
  })
    .catch(e => {
      // folder doesn't exist, so nothing to worry about
    })
}
// like "abs#swapByEnv", will replace the object value with the qa1 or qadefault
function swapEnvSpecificContent(content) {
  for (const key in content) {
    const value = content[key];
    if (key.endsWith('#swapByEnv')) {
      if (Array.isArray(value) || typeof value != 'object') {
        throw Error(`#swapByEnv was found "${key}#swapByEnv" but value "${value}" is not an object`);
      }
      // qa1 is for dpcs infrastructure and dit is gor aws
      let valForEnv = value['QA1'] || value['DIT'];
      if (!value.hasOwnProperty('QA1') && !value.hasOwnProperty('DIT')) {
        valForEnv = value.qaDefault;
      }
      // "==" instead of"===" to throw errors on undefined and null but allow empty strings
      if (valForEnv == null) {
        throw Error(`
        #swapByEnv was found in key "${key}#swapByEnv" but no value for qa1 or dit was found in ${value}`);
      }
      delete content[key];
      content[key.replace('#swapByEnv', '')] = valForEnv;
    } else if (typeof value === 'object') {
      swapEnvSpecificContent(value);
    }
  }
  return content;
}

module.exports = (contentPath, mockDirectoryPath, servedPort = 5000) => {
  const mockContentPath = path.join(mockDirectoryPath, 'content');

  // delete any existing mock content
  return deleteDirectory(mockContentPath).then(() => {
    // create mock directory id it doesnot already exit
    try {
      fs.mkdirSync(mockDirectoryPath);
      console.log(`create folder for mock api responses at ${mockDirectoryPath}`);

    } catch (e) {
      // folder already exit, nothing to worry
    }
    // create an empty mock content directory
    fs.mkdirSync(mockContentPath);
    // get all of the content files
    return readdir(contentPath);
  })
    .then(contentFiles => {
      // filter out hiden files ( any file name starts with '.'
      // (^|\/) catches basenames or paths. exam: ".hiddenfile" or "path/.hiddenfile"
      contenFiles = contentFiles.filter(file =>
        !/(^|\/)\./g.test(file));
      contentFiles.forEach(file => {
        // read each file and create a mock with the correct name
        const contentPath = path.dirname(file).split(path.sep).pop(),
          contentPage = path.basename(file),
          // exam: pathproposalpageindex.content.json for the content content/proposal/index.json
          mockFileName = path.join(mockContentPath, `path${contentPath}page${contentPage.split('.')[0]}.mock.json`);

        let content = fs.readFileSync(file, 'utf8');
        content = JSON.stringify(
          JSON.parse(content
            // replace any relative backend endpoints with absolute ones that point to http://localhost:${servedPort} so that they will
            // route to apimocker first before being proxied to the local node server
            .replace(
              /\/(?:ft|pr|gt)gw\/(?:\w+)\/(?:\w+)\/api\/[\w\-/]+/g,
              match => `http://localhost:${servedPort}${match}`
            ).replace(/"\/(?:ft|pr|gt)gw\/(?:w+)\/(?:\w+)(\/(?!api).*)/g, (match, p1) => `\"${p1}`)
            .replace(/"(api|\/api)\//, `"http://localhost:${servedPort}/any/any/any/api/`)

          )
        ), null, 2
      )
      try {
        fs.writeFileSync(mockFileName, content);
      } catch (e) {
        console.error(`unable to write ${mockFileName}`, e);
      }
    });
  console.log(`completed making apimockers for content`);
})
.catch (() => noop);
}
