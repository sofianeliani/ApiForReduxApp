
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
    () => {
      console.log(" Mongoose is connected")
      initial();
    }
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

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true

}

/* use middleware */
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// app.use(function(req, res ,next)  {
//     res.header('Access-Control-Allow-Origin', 'http://18.192.215.62/');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.options('*', cors());
//     next();
// })

/* first route */
app.get('/', (req, res) => res.send({ message: "Hello"}))
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/article.routes')(app);

app.listen(port, () => console.log(`listening ok`))