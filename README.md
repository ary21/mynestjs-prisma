# Stack : 
NestJS, Prisma, Postgres

### Run :
- set env 
- env > DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<db_name>?schema=<schema_name>"
- > yarn start:dev | yarn start:prod

### Module :
- > nest g module <module_name>
- > nest g service <service_name>
- Or generate resource (module, service, controller/resolver)
- > nest g resource <resource_name>

### Migration :
- make change prisma.schema
- > npx prisma migrate dev
- reset db dev and run seed
- > npx prisma migrate reset

### Prisma studio
- gui table on browser
- > npx prisma studio