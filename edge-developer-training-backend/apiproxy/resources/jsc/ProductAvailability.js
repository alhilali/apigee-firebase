var productId = context.getVariable('productId');
var newPath = '/skus/S' + productId;
context.setVariable('pathSuffix', newPath);


