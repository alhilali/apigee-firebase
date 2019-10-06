# edge-developer-training-backend proxy
This is a facade proxy for the backend database and it allows Apigee to swap the backend database for a new one without impacting the labs.  

## Summary
This repository contains the following:
1. [OpenAPI specification](https://innersource.accenture.com/projects/VW/repos/apigeepaymentproxy/browse/openapi)

## TOC
* [Apigee Edge](#apigee-edge)
  * [deploy](#deploy)
  * [Tests](#tests)

## Prerequisites
You may need to [install acurl](http://docs.apigee.com/api-services/content/using-oauth2-security-apigee-edge-management-api#howtogetoauth2tokens).


You must export the following environment variables:
```
export ae_password=apigeepassword
export ae_username=apigeeusername
export ae_org=apigeeorg
```


### edge.json
The edge.json file contains the configuration (KVMs, Caches, Target Servers, products, developers apps, etc.) for deploying the proxy to Edge.

## Helpful to Know
You don't have to review these links, since I list all the commands to deploy the proxy.  But if you are interested in learning more about the config and deploy plugins, then you should read them.
* [apigee-config-maven-plugin](https://github.com/apigee/apigee-config-maven-plugin)
* [apigee-maven-deploy-plugin](https://github.com/apigee/apigee-deploy-maven-plugin)


# Apigee Edge

## Deploy
Follow the steps below to deploy the proxy, and create the developer, product and app in Apigee Edge.

### Proxy
This will deploy the `edge-developer-training-backend` proxy and create the Apigee developer named `developertraining@example.com`, a product named `edge-developer-training-backend-product` and an app named `edge-developer-training-backend-app`.

#### Deploy proxy first time
If you are running this for the first time then you must deploy the proxy first, before you run the config step.  Then run the config step below.
```
mvn install -Ptest -Dusername=$ae_username -Dpassword=$ae_password \
                    -Dorg=$ae_org -Dauthtype=oauth -Doptions=inactive
```
or
```
mvn install -Ptest -Dusername=$ae_username -Dpassword=$ae_password \
                    -Dorg=$ae_org -Doptions=inactive
```

#### Subsequent proxy deployments
If the proxy is deployed, then you can run this command.  It will redeploy the proxy and create the necessary configuration.

```
mvn install -Ptest -Dusername=$ae_username -Dpassword=$ae_password \
                    -Dorg=$ae_org -Dauthtype=oauth -Dapigee.config.options=create
```

or

```
mvn install -Ptest -Dusername=$ae_username -Dpassword=$ae_password \
                    -Dorg=$ae_org -Dapigee.config.options=create
```

#### Override existing revision
```
mvn install -Ptest -Dusername=$ae_username -Dpassword=$ae_password \
                    -Dorg=$ae_org -Doptions=update
```

## Tests

### Unit Tests

### Integration Tests
