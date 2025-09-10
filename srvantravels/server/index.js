import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import db from "./db.js";
import configurePassport from "./passportConfig.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({ secret: "key", resave: false, saveUninitialized: false })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser("key"));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.get("/", (req, res) => {
  res.send("ILOY SI CLIFF");
});

app.post("/register", (req, res) => {
  console.log("Accessing register");
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const contact = req.body.contact;

  const query =
    "INSERT INTO Person (`name`, `password`, `email`, `contact_number`) VALUES (?, ?, ?, ?)";
  const hasEmailQuery = "SELECT * FROM Person WHERE email = ?";
  const usernameExistsQuery = "SELECT * FROM Person WHERE name = ?";

  console.log("checking email");
  db.query(hasEmailQuery, [email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send({ message: "Email already in use" });
    }

    console.log("checking username");
    db.query(usernameExistsQuery, [username], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.send({ message: "Username already taken" });
      }

      // Hash password and insert
      console.log("hashing password");
      const hashedPassword = bcrypt.hashSync(password, 10);
      console.log("inserting user");
      db.query(query, [username, hashedPassword, email, contact], (err) => {
        if (err) throw err;
        return res.send({ message: "Registration successful" });
      });
    });
  });
});

app.post("/login", (req, res, next) => {
  console.log("Accessing login");
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) return res.send({ message: "No user exists" });
    if (user) {
      req.logIn(user, (err) => {
        if (err) throw err;
        return res.send({ message: "Successfully Authenticated", user: user });
      });
    }
  })(req, res, next);
});

app.listen(5174, () => {
  console.log("iloy si cliff");
});
