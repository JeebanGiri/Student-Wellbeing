// require('dotenv').config();  


// const { Pool } = require('pg');


// const isProduction = process.env.NODE_ENV === 'produciton';

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const pool = new Pool({
//         connectionString: isProduction ? process.env.DATABASE_URL : connectionString
// });



// const DB = {
//         query: function(query, callback) {
//                 console.log("inside db")
//             pool.connect((err, client, done) => {
//                 if(err) {
//                     console.log("error",err)
//                 }
//                 client.query(query, (err, results) => {
//                     done()
//                     if(err) { console.error("ERROR: ", err) }
//                     // callback(null, results.rows)
//                 })
//             });
//         }
//     }

// module.exports = { DB };


// const {Client} = require('pg');

// const client = new Client({
//     host:"localhost",
//     user:"postgres",
//     port:"5432",
//     password:"Jeeban",
//     database:"avalanche"
// })

// client.connect();

// client.query(`select * from student`, (err, res) => {
//     if (!err) {
//       console.log(res.rows);
//     } else {
//       console.log(err.message);
//     }
//     client.end;
//   });

// module.exports ={client}






