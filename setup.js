var prompt = require("prompt");
var colors = require("colors/safe");
var replace = require("replace-in-file");

var proxydir = "./edge-developer-training-backend";
var idpProxydir = "./edge-developer-training-idp";

var schema = {
    properties: {
      username: {
        description: colors.yellow("Please provide the Apigee Edge username"),
        message: colors.red("Apigee Edge username cannot be empty!"),
        required: true
      },
      password: {
        description: colors.yellow("Please provide the Apigee Edge password"),
        message: colors.red("Apigee Edge password cannot be empty!"),
        hidden: true,  
        replace: '*',
        required: true
      },
      org: {
        description: colors.yellow("Please provide the Apigee Edge Organization name"),
        message: colors.red("Apigee Edge Organization name cannot be empty!"),
        required: true
      },
      env: {
        description: colors.yellow("Please provide the Apigee Edge Environment name"),
        message: colors.red("Apigee Edge Environment name cannot be empty!"),
        required: true
      },
      firebaseHost: {
        description: colors.yellow("Please provide the Firebase Host name"),
        message: colors.red("Firebase Host name cannot be empty!"),
        required: true
      }
    }
  };
 
//
// Start the prompt
//
prompt.start();
//
// Get two properties from the user: email, password
//
prompt.get(schema, function (err, options) {
  //console.log(JSON.stringify(options));
  replaceFirebaseProject(options);
  deployProxyAndDependencies(proxydir, options);
  deployProxyAndDependencies(idpProxydir, options);
});


/*
Replace the firebase-hostname in the edge.json file with the one from the command line.
*/
function replaceFirebaseProject(options){
  var optionsReplacer = {
    files: './edge-developer-training-backend/edge.json',
    from: /"host" : ".*"/g,
    to: '"host" : "' + options.firebaseHost + '"',
  };

  try {
    const changes = replace.sync(optionsReplacer);
    console.log('Modified files:', changes.join(', '));
  }
  catch (error) {
    console.error('Error occurred trying to update the firebase project ID.');
    //console.error('Error occurred trying to update the firebase project ID:', error);
  }
}

/*
Executes the maven deployment plugin twice:
1) creates the target serve, deploys the proxy.
2) creates the Apigee product, apps, and developer
*/
function deployProxyAndDependencies(proxyDir, options){
  const mvn = require('maven').create({
        cwd: proxyDir,
        profiles: [options.env],
        debug: false
      });

  var mvnArgs = {
    'username': options.username,
    'password': options.password,
    'org': options.org,
    'https.protocols' : 'TLSv1.2',
    'options': 'update',
    'apigee.config.options': 'update'
  };
  mvn.execute(['clean', 'install'], mvnArgs).then(() => {
    console.log(proxyDir+ ' successfully configured!');
  });
}
