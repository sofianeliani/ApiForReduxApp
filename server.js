
const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()
const port = 3000
const db = require("./models");
const Role = db.role;
const connectionString  = "mongodb+srv://Admin:Admin@cluster0.imlvo.mongodb.net/Myreduxapp?retryWrites=true&w=majority";
try {
  // Connect to the MongoDB cluster
   db.mongoose.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect");
}

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

/* use middleware */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/* first route */
app.get('/', (req, res) => res.send({ message: "Hello"}))
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/article.routes')(app);

app.listen(() => console.log(`listening ok`))