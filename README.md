# Butler Note
* How to start database migration: `psql butler_development`
* How to access postgres database: `./node_modules/.bin/sequelize db:migrate`
* How to run migration in Production(May have to create the DB first) `./node_modules/.bin/sequelize --env production db:migrate`
* How to run all seeders `./node_modules/.bin/sequelize db:seed:all`
* How to access bash shell of Heroku `heroku run bash`
* Supported Browser - Chrome (Firefox and IE also works. However, input type date is not fully supported in those browsers)

# Installation
## Windows
* Install Git shell
* Create account in Git
* Sync down from https://github.com/keetaek/butler
* Install Latest Node JS - https://nodejs.org/en/download/

### Database
#### PostgreSQL
* Install Postgres for Windows http://www.enterprisedb.com/products-services-training/pgdownload#windows
*


#### SQL Server (Not used anymore)
* Install SQL Server Express - https://www.microsoft.com/en-us/server-cloud/products/sql-server-editions/sql-server-express.aspx
** Change Authentication mode - https://msdn.microsoft.com/en-us/library/ms188670.aspx
** Create a Butler account (Make sure the account is granted) https://msdn.microsoft.com/en-us/library/aa337562.aspx
** Install tedious package (node)
** Enable network protocol and set IP addresses and ports - https://www.spdockit.com/support/help/faq/troubleshooting-sql-server/configure-sql-server-listen-specific-port/
** Run migration - ./node_modules/.bin/sequelize db:migrate --env production
** Run seed data
** Confirm whether SQL is properly connected http://www.cyberciti.biz/faq/howto-ms-sql-list-tables-and-database/
* `npm run build; npm run start`

### Service
When install in Windows machine `npm install` will trigger the post install action to create a service. However, one needs to be in Admin mode, in order to start a [Service](http://stackoverflow.com/questions/7690994/powershell-running-a-command-as-administrator)
