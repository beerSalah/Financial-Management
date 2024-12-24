const express = require("express");
const app = express();
const dbConnection = require("./config/DB_connection");
const dotenv = require("dotenv");
const Routes = require("./routes/index ");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require('path');


port = process.env.PORT || 4444;
dotenv.config(); 
dbConnection();
  
app.enable("trust proxy");

app.use(cors(
  // {
  //   origin: 'http://127.0.0.1:5501',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true
  // }
));
// app.options( "*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/dashboard", (req, res) => {
  const dashboardPath = path.join(__dirname, '/frontend/dashboard.html');
  res.sendFile(dashboardPath);
}); 
// app.get("/test", (req, res) => {
//   res.sendFile(__dirname + "/frontend/test.html");
// }); 
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
}); 

app.use("/employee", express.static("./Uploads_image"));
app.use("/employee", express.static("./Uploads_Qualification_certificate"));
app.use("/employee", express.static("./Uploads_Personal_ID_card"));
app.use(express.static(__dirname + "/frontend"));

app.use("/", Routes);

app.all('*',(req,res)=>{
  res.send({
      massage:"not found routes"
  })
})

app.listen(port, () => {
    console.log(`the server is running on port : ${ port} on  http://localhost:${port}`);
  });
  