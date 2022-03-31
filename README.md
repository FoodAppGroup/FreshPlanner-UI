[![Continuous-Integration](https://github.com/home-planner-group/fresh-planner-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/home-planner-group/fresh-planner-ui/actions/workflows/ci.yml)
[![Docker-Image](https://github.com/home-planner-group/fresh-planner-ui/actions/workflows/docker-image.yml/badge.svg)](https://github.com/home-planner-group/fresh-planner-ui/actions/workflows/docker-image.yml)

# FreshPlanner UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

The application starts on [http://localhost:4200](http://localhost:4200).

### Purpose

This project has the purpose to get involved with __Angular__ (TypeScript, NPM), __Docker__ and __GitHub__ (Actions,
Packages, Projects).

### Description

The application is an __Angular Web UI__ to provide a user interface for the underlying backend. The UI acts like a REST
Client and supports mobile and desktop browsers.

## Architecture

### Overview

```
                Browser
                   |
                Routing
                   |
     Stores --> Components  ----
                   |           |
Interceptor --> Services --> Models
                   |
                REST API
```

### Explanation

* Browser = `localhost:4200`
* Routing = [routing module](src/app/app-routing.module.ts)
* Components = [component-package](src/app/components)
* Stores = [store-package](src/app/stores)
* Services = [service-package](src/app/services)
* Models = [model-package](src/app/models)
* Interceptor = [interceptor-package](src/app/interceptors)
* REST API = `localhost:8080`

## Dev Requirements

* Download and Install [NodeJS](https://nodejs.org/) v16.14.1+
* Install [Angular CLI](https://github.com/angular/angular-cli) v13.3.0: `npm install -g @angular/cli@13.3.0`
* Download and Install [Docker](https://docs.docker.com/desktop/windows/install/)
  * Build Image: `docker build -t fresh-planner-ui .`

## Dependencies

* [Angular Material](https://material.angular.io/guide/getting-started):
  * `ng add @angular/material`
* [Flex Layout](https://github.com/angular/flex-layout):
  * `npm i -s @angular/flex-layout @angular/cdk`
  * Tool: [Demo](https://tburleson-layouts-demos.firebaseapp.com/#/docs)
* [NGRX Store](https://ngrx.io/guide/store) with [DevTools](https://ngrx.io/guide/store-devtools):
  * `ng add @ngrx/store@latest` & `ng add @ngrx/store-devtools@latest`
  * Tool: [Browser Plugin](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## GitHub Workflows

### [Continuous Integration](.github/workflows/ci.yml)

* __Trigger:__ all pushes
* Executes `npm install` & `npm run build --prod`
* No tests yet

### [Docker Image for GitHub](.github/workflows/docker-image.yml)

* __Trigger:__ manual or on published release
* Executes `docker build`
* Execute `docker push` to GitHub Packages

## [Docker Image](Dockerfile)

* Divided into __Builder__ and __Runner__
* Image with [Nginx Alpine](https://hub.docker.com/_/nginx) and the distribution
* Exposes `Port 4200`
* Uses by default __API__ at `Port 8080`
* Detailed configuration: [environment.prod](src/environments/environment.prod.ts)

## Angular Commands

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
