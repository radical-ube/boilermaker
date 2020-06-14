const app = require('./server');
const port = process.env.PORT || 3000
const { db } = require('./server/db')


// pass {force:true} to drop tables before re-creating them
// do NOT do this in production, only in dev
db.sync()
  .then(() => {
    console.log('db synced');
    app.listen(port, () => {
      console.log(`Server started at port: ${port}`)
    })
  })
