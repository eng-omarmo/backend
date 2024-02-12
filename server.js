const express = require("express");
const dotenv = require("dotenv").config();
const connectdb = require('./config/dbConnection')
const errorHandler = require('./middleware/errorHandler')

const contactRoute = require('./Routers/contactRouters'); // Assuming your router file is named 'contactRouters.js'
const usersRoute = require('./Routers/UserRouter'); // Assuming your router file is named 'contactRouters.js'

connectdb(process.env.URL);

const app = express();

const port = process.env.PORT || 5000; // Correcting port to use PORT instead of Port

app.use(express.json());//body parser for json

app.use(errorHandler);//customized error handler



app.use("/api/contacts", contactRoute);
app.use("/api", usersRoute);



app.listen(port, () => {
    console.log(`app is running on ${port}`);
});
