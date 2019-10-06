//target = context.getVariable('target.url');
realPathSuffix = context.getVariable('proxy.pathsuffix');
pathSuffix = context.getVariable('pathSuffix');
basepath = context.getVariable('proxy.basepath');
//var target = target + pathSuffix + '.json';

context.setVariable('dynamicPath', basepath + pathSuffix + '.json');
