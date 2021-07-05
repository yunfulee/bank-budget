const fs = require('fs');

module.exports = (apimockConfigPath, mockDirectoryPath) =>{
  if(!fs.existsSync(apimockConfigPath)){
    const minimalConfigWidthContent = {
      mockDirectory:mockDirectoryPath,
      basepath:'./:contect/:webserver/:serviceId/api',
      allowHeaders:['x-provided-format','x-expected-format','fsreqid','content-type'],
      corsCredential:'true',
      webServices:{
        'content/:path/:page':{
          mockFile:'content/mock.json',
          verbs:['get'],
          switch:['path','page']
        }
      }
    };
    console.log(`create apimock config at ${apimockConfigPath}`);
    fs.writeFileSync(apimockConfigPath,`module.exports=${JSON.stringify(minimalConfigWidthContent,null,2)};`);
  }
};

