# BLOGGING

## Pre-requirements 
Below are the requirements need to be installed before you started.
1) Node version v12.14.0
2) MongoDb v4.2.2

## Cloning Project 
```bash
git clone https://github.com/hardik49/BlogPosts
```

## Shift to project directory
```bash
cd BlogPosts
```

## Construct new .env and configure the following
```node
MONGO_URL = 'mongodb://localhost/"database name"'
SECRET_KEY = "secret key"
PORT = Any of unused port number
```

## Install Modules
```node
npm i
```

## Start mongo server
```node
service mongod start
```

## To Run project
```node
node index.js
```