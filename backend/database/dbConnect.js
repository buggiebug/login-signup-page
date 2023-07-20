const mongoose = require("mongoose");

const connectDb = ()=>{
    mongoose.connect(process.env.DB_URL,{dbName:"loginSignup"}).then((res)=>{
        console.log(`Database connected with ${res.connection.host}`);
    }).catch((err)=>{
        console.log(`Errors: ${err}`);
    })
}

module.exports = connectDb;


