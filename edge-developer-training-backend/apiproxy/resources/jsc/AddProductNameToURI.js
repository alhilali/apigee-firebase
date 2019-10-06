var productId = context.getVariable('productName');
var newPath = '/products/' + productId;
context.setVariable('pathSuffix', newPath);