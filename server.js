const express = require("express");
const session = require("express-session");
require("dotenv").config();
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Public"));

const sess = {
  secret: "Capitalism is bad, mmmkay",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use('/', routes);

app.use(session(sess));

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + "/Public/index.html");
})

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
