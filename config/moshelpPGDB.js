const SQL = require('sequelize');


// module.exports.moshelpPG =()=>{
//   const sequelize = new SQL('MOSHelp', 'alexa', '08963572A', {
//     host: 'localhost',
//     port: 5432,
//     dialect: 'postgres',
// dialectOptions: {
//         useUTC: false, //for reading from database
//         dateStrings: true,
//         typeCast: true
//   },

  //Setting up the config
module.exports.moshelpPG =()=>{
  const sequelize = new SQL('moshelp', 'moshelp_dev', 'moshelp2020', {
    host: 'moshelp.cpgemnla0ncf.ap-southeast-1.rds.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000
    },
  timezone: '+07:00'
});
    
    sequelize.authenticate()
    .then(function(err) {
      console.log('PostGre Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });

    return { sequelize };
}
