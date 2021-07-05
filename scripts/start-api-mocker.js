const args = require("yargs")
.version("1.0.0")
.option("project",{
  alias:"p",
  default:"bank-budget",
  descroption:"projec name to start a mock api serve, later be in a folder in ./apps(will create a workplace,contains many apps)",
  type:"string"
})
.option("port",{
  default:"5000",
  description:"port to serve the mock on",
  type:"number"
})
.option("proxy",{
  default:true,
  description:' use --no-proxy to turn off proxying to localhost for unmatched requests',
  type:"boolean"
})
.help().argv,
path = require("path"),
fs = require("fs"),
qs = require('querystring'),
createMockContent= require('./create-mock-content'),
initForApiMocker = require('./init-api-mocker'),
projectPath=path.join(projectPath,args.project),
mockDirectoryPath = path.join(projectPath,'mock-api-responses'),
mockFileLoc='apimocker.conf.js',
confgiPath= path.join(projectPath,mockFileLoc),
contentPath = path.join(projectPath,'content'),
apiMocker = require('apimocker'),
bodyParser = require('body-parser');

// make sure that the project has a config file for apimocker defined
// if it does not, this will create a boilerplate one automatically
initForApiMocker(confgiPath,mockDirectoryPath);

// this will create content mock files from files in the project's content directory

createMockContent(contentPath,mockDirectoryPath,args.port).then(()=>{
  // define the serve and start it
  const serverConfig = {};
  if(args.proxy){
    serverConfig.proxyURL="http://localhost:3000";
  }
  const mockServer = apomocker.createServer(serverConfig).setConfigFile('./apps/${args.project}/${mockFileLoc}');

  mockServer.middlewares.unshift(
    bodyParser.json({
      limit:'512kb',
      extened:true
    }),
    (req,res,next)=>{
      if(req.headers.referer){
        Object.assign(req.query.qs.decode(req.headers.referer.split('?')[1]),req,query);
      }
      next();
    }
  );
  const indexOfSetHeaderCode =
  mockServer.middlewares.findIndex(val=>val.toString().includes('Access-Control-Allow-Origin'))|| 0;
  mockServer.middlewares.splice(indexOfSetHeaderCode+1,0,(req,res,next)=>{
    res.set('Access-Control-Allow-Origin'.req.headers.origin);
    next();
  });
  if(fs.existsSync(contentPath)){
    fs.watch(contentPath,{recursive:true},()=>{
      createMockContent(contentPath,mockDirectoryPath,args.port);
    });
  }
  mockServer.start(args.port);
})

