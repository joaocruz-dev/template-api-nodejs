# API-TypeScript

> Initial files for API in TypeScript, using NestJS and MongoDB

## Start

Clone repository in the folder you want

```bash
git init
git clone https://github.com/Joao-CruzA/API-TypeScript.git
```

Make the necessary installations

```bash
yarn
```
or
```bash
npm install
```

Then just run the command to start the dev environment. 
He had started running on port 3000 (https://localhost:5009/api/start)

```bash
yarn dev
```

Or the command to build the code

```bash
yarn build
```

**Don't forget to make the recommended settings first. (Right below)**

## Configuration

In the package.json file, change the name and description of your project (Remembering that the database will use the name of the project, for example project_name.back, the db will be called "project_name")

```json
"name": "project_name.back",
"version": "0.0.1",
"description": "Api project_name",
...
```

**Don't forget to also change the project name in the BaseController file in the src/Api/Controllers/public/Base folder**



