import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import db from "~/models";
import routes from "~/routes";

const app = express();

// var corsOptions = {
//   origin: 'http://localhost:8080'
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "10mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Sitnee API Service !" });
});

app.use(express.static("public"));
app.use(fileUpload());

routes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
