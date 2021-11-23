const { Pool } = require('pg')
let config={
    ssl: {
        rejectUnauthorized: false
      }
}
const pool = new Pool(config)
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}

// module.exports = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback)
//   },
// }