var payload = context.getVariable('response.content');
var targetResponsePayload = JSON.parse(payload);
var pathSuffix = context.getVariable('pathSuffix');
var baasPayload = {};

baasPayload.entities = [];

regex = /\/(products|stores|skus)\/\w*/;
//storesRegex = /(\/*\/)/;

if(regex.test(pathSuffix)){
    print("regex");
    baasPayload.entities.push(targetResponsePayload);
} else {
    for (var key in targetResponsePayload) {
        if (targetResponsePayload.hasOwnProperty(key)) {
            baasPayload.entities.push(targetResponsePayload[key]);
            //console.log(key + " -> " + p[key]);
        }
    }
}

context.setVariable('response.content', JSON.stringify(baasPayload));