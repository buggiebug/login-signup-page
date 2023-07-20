require("dotenv").config({path:"./config.env"})
const express    =   require("express");
const cors       =   require("cors");
const dbConnect  =   require("./database/dbConnect");
const app        =   express();
const PORT       =   process.env.PORT;
const HOST       =   process.env.HOST;


app.use(cors());
app.use(express.json());

dbConnect();

app.use(require("./routes/router"));

app.listen(PORT,()=>{
    console.log(`server running at http://${HOST}:${PORT}`)
});
