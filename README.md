# To Access
* Follow the link: http://timetable.stefanbenincasa.com/
* Use default 'Email Address & Password' crendetials: john.smith@email.com, qwerty

# To Run
* A config.ts file is needed in the /server/src/assets/ directory, with credentials filled in to suit your PSQL Instance, then compile to JS.
The file should contain the following code:

  let databaseConfig = { 
      database: 'timetable',
      user: '', 
      password: '', 
      port: 5432,
      max: 20, 
      idleTimeoutMillis: 1000,
      connectionTimeoutMillis: 1000,
      maxUses: 7500
    }
  
  export { databaseConfig }
