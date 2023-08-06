const app = require ('./app');
const {db} = require ('./database/config.js')

db.authenticate()
    .then((res)=> console.log("Database conected"))
    .catch((err)=> console.log(err))

db.sync()
    .then((res)=> console.log("Database synced"))
    .catch((err)=> console.log(err))


const PORT = 4000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
