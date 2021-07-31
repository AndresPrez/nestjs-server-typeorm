This directory ('database') will store any files related to the database datamodel entities, ORM files seeds and migrations.

## Entities

The folder 'entities' contains all of the data model entities and its relations defined with TypeORM decorators.

## Seeds

The folder 'seeds' contains TypeOrm Migrations used for seeding data into the database.
The order in which the seed files are executed depends not on the file names but on the timestamp
suffix of each of the file class names.
