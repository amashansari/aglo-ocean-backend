const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const cors = require("cors"); 

app.use(cors()); 
app.use(bodyParser.json());
app.locals.userData = [];

const user_data_routes = require("./routes/user_data");

/////// GET ///////
app.get("/", app.use(user_data_routes));

/////// POST ///////
app.post("/", user_data_routes);


app.listen(8080);
