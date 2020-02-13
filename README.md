##Adding Onlyoffice modules to Alfresco

## 1.Step : Let's add the adf-onlyoffice-services-ext folder to the project

## 2.Step : in e2e/resources/extensibility-configs
  a.info-drawer-ext.json

    "$references": ["aos.plugin.json"],

area

    "$references": ["aos.plugin.json","onlyoffice.plugin.json"],

Let's change to.

b.viewer-ext.json


    "$references": ["aos.plugin.json"],

area

    "$references": ["aos.plugin.json","onlyoffice.plugin.json"],

Let's change to.


##3. Step : in the  src/app/extensions.module.ts


     import { OnlyofficeExtensionModule } from '@alfresco/adf-onlyoffice-services-ext';

will be imported and

    @NgModule({
        imports: [AosExtensionModule, OnlyofficeExtensionModule]
       })
  
will be changed to


##4. Step : in the  src/assets/app.extensions.json
  
    "$references": ["aos.plugin.json", "app.header.json"],

  area
   
    "$references": ["aos.plugin.json","onlyoffice.plugin.json", "app.header.json"],
Let's change to.


##5. Step : into assets in angular.json
        {
        "glob": "**/*",
        "input": "node_modules/@alfresco/adf-onlyoffice-services-ext/assets",
        "output": "./assets/adf-onlyoffice-services-ext"
       },
       {
        "glob": "**/*",
        "input": "projects/adf-onlyoffice-services-ext/assets",
        "output": "./assets/adf-onlyoffice-services-ext"
       },
       {
        "glob": "onlyoffice.plugin.json",
        "input": "node_modules/@alfresco/adf-onlyoffice-services-ext/assets",
        "output": "./assets/plugins"
       },
       {
        "glob": "onlyoffice.plugin.json",
        "input": "projects/adf-onlyoffice-services-ext/assets",
        "output": "./assets/plugins"
       } 

will be added and
      
       "adf-onlyoffice-services-ext": {
        "root": "projects/adf-onlyoffice-services-ext",
        "sourceRoot": "projects/adf-onlyoffice-services-ext/src",
        "projectType": "library",
        "prefix": "lib",
        "architect": {
          "build": {
            "builder": "@angular-devkit/build-ng-packagr:build",
            "options": {
              "tsConfig": "projects/adf-onlyoffice-services-ext/tsconfig.lib.json",
              "project": "projects/adf-onlyoffice-services-ext/ng-package.json"
            }
          },
          "test": {
            "builder": "@angular-devkit/build-angular:karma",
            "options": {
              "main": "projects/adf-onlyoffice-services-ext/src/test.ts",
              "tsConfig": "projects/adf-onlyoffice-services-ext/tsconfig.spec.json",
              "karmaConfig": "projects/adf-onlyoffice-services-ext/karma.conf.js"
            }
          },
          "lint": {
            "builder": "@angular-devkit/build-angular:tslint",
            "options": {
              "tsConfig": [
                "projects/adf-onlyoffice-services-ext/tsconfig.lib.json",
                "projects/adf-onlyoffice-services-ext/tsconfig.spec.json"
              ],
              "exclude": [
                "**/node_modules/**"
              ]
            }
          }
        }
       },

 It will be added.


 ##6. Step : in the package.json
    "build:onlyoffice-extension": "npx rimraf dist/@alfresco/adf-onlyoffice-services-ext && ng build adf-onlyoffice-services-ext && cpr projects/adf-onlyoffice-services-ext/ngi.json dist/@alfresco/adf-onlyoffice-services-ext/ngi.json && cpr projects/adf-onlyoffice-services-ext/assets dist/@alfresco/adf-onlyoffice-services-ext/assets",
    
after added
     
    "build.extensions": "npm run build:aos-extension && npm run build:onlyoffice-extension",
the area will be arranged this way.


##7. Step : into paths: in tsconfig.json
      
       "@alfresco/adf-onlyoffice-services-ext": [
        "dist/@alfresco/adf-onlyoffice-services-ext"
       ],
       "@alfresco/adf-onlyoffice-services-ext/*": [
        "dist/@alfresco/adf-onlyoffice-services-ext/*"
       ],

Let's add


##8. Step : Let's start building the OnlyOffice component.  Let's add the Onlyoffice folder to src/app/component.


##9. Step : into app.routes.ts in src/app

      
       {
        path: 'onlyoffice/:nodeId',
        loadChildren:
          './components/onlyoffice/onlyoffice.module#AppOnlyofficeModule',
        runGuardsAndResolvers: 'always'
       },  
  
Let's add


##10.Step : projects/adf-onlyoffice-services-ext/src/lib/aos-extension.service.ts
 The url fields in the localhost must be the Onlyoffice installed url.


##11. Step: OnlyOffice module and component have been added.


##Developers

  Muhammed Eren Demir 
 
  Mustafa Karacuha
 
  Suayb Şimsek


