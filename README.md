### Installation
clone repo 

open two terminal tabs - first in root, other in /client

in root: `npm install` then `bower install`

in /client run `gulp —dev` - this will:

- generate frontend build directory with angular app set up 
- watch for changes in the angular js/less/html files and auto build/auto inject scripts to build/index.html (which is bound to the loopback server static files server)

### Set up Loopback
What is it? http://loopback.io/ 

Create a model with the Loopback cli:  `slc loopback:model Account` - The generator guides you through creating your model. Enter the values highlighted in blue. To accept the default, just press Enter.

Test run the app with either `node .` or `slc run`

Load http://0.0.0.0:3000/explorer to see the built-in API Explorer.

Now Add a postgres db:  `slc loopback:datasource postgres` (where “postgres” is the name we chose for the db - can be any name)

> make sure server/datasources.json matches your database name, for example:

```
{
     "db": {
          "name": "db",
          "connector": "memory"
     },
     “postgres": {
          "name": “postgres",
          "connector": "postgresql",
          "host": "localhost",
          "port": 5432,
          "name": "pgDs",
          "connector": "postgresql"
    }
}
```
Follow the steps here http://docs.strongloop.com/display/public/LB/Connecting+to+PostgreSQL starting at "Configure the data source” being sure to name your models in the automigrate script exactly as you named them with the cli generator (models should now live in ./common/models)


### Heroku prep:

Update package.json to add the following line so the app will use the latest stable version of Node.js:

 ```
       "engines": {        
              "node": "0.10.x"     
       }
 ``` 
 
Create a Procfile in the root directory of your app that contains the following: `web: slc run`

run `heroku login`

run `heroku apps:create --buildpack https://github.com/strongloop/strongloop-buildpacks.git`

push to heroku. `git push heroku master` - this will take a bit longer than django apps

Set the production environment variable `heroku config:set NODE_ENV=production` (this is important because Loopback will optionally read config files based on the naming scheme `‘datasources.ENV.json’`)

add a postgres database. run `heroku addons:add heroku-postgresql:hobby-dev`

Now the heroku config var is available: `DATABASE_URL`

ensure the file `server/datasources.production.js` matches the database name you specified earlier. For ex: (where “postgres” is the name we chose for the db)

```
module.exports = {
    postgres: {
        defaultForType: 'postgresql',
        connector: 'postgresql',
        url: process.env.DATABASE_URL
    }
};
```
- now run migrations on heroku. open a bash terminal and run the scripts

`heroku run bash`

`cd server/bin`

`node autoupdate.js`  and/or `node automigrate.js`

- exit heroku bash. then run `heroku ps:scale web=1` and `heroku restart`
> open the app 