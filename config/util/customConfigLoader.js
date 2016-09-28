import fs from 'fs';
export default (configName) => {
  var files = fs.readdirSync('./config')
  for (var dirName of files) {
    let isDir = fs.statSync('./config/' + dirName).isDirectory();
    if (isDir) {
      let customRouteConfigFile = './config/' + dirName + '/routes.js';
      let hasCustomRouteConfigFile = fs.existsSync(customRouteConfigFile);
      if (hasCustomRouteConfigFile) {
        return require(__dirname+"/../" + dirName + '/'+configName);
      }
    }
  }

  return {}
};
