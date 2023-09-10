const express = require("express");
const QueryDb = require("./database");
const passport = require("passport");
// const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const { Client } = require("pg");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "Jeeban",
  database: "avalanche",
});

client.connect();

// Rest of the code...

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // console.log("index page");
  res.render("index");
});

app.get("/register", (req, res) => {
  console.log("register page");
  res.render("register");
});
app.get("/login", (req, res) => {
  console.log("login Page");
  res.render("login");
});
app.get("/home", (req, res) => {
  console.log("Home");
  res.render("home");
});
app.get("/forgetpass", (req, res) => {
  console.log("Forget Password");
  res.render("forgetpass");
});
// app.get("/navbar", (req, res) => {
//   console.log("navbar");
//   res.render("navbar");
// });
app.get("/support", (req, res) => {
  console.log("support");
  res.render("support");
});

app.get("/manage", (req, res) => {
  console.log("manage");
  res.render("manage");
});



app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("username", username);
    console.log("email", email);
    console.log("password", password);

    console.log("hashing");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    client.query(
      `INSERT INTO Student (Name, Email, Password) VALUES ($1, $2, $3)`,
      [username, email, password],
      (error, results) => {
        if (error) {
          console.log("error", error);
          const message = "Registration failed";
          res.render("register", { message });
        } else {
          console.log("Registered successfully");
          console.log("Registered successfully again");
          const message = "Registered successfully";
          res.render("login", { message });
        }
      }
    );
  } catch (error) {
    console.log("error", error);
    const message = "Registration failed";
    res.render("register", { message });
  }
});



  app.post("/login", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      if (!email || !password) {
        const errors = [{ message: "Please enter all the fields" }];
        res.render("login", { errors });
        return;
      }
  
      if (email === "admin@gmail.com") {
        client.query("SELECT * FROM Admin WHERE email = $1", [email], (error, results) => {
          if (error) {
            throw error;
          } else if (results.rows.length > 0) {
            const admin = results.rows[0];
            bcrypt.compare(password, admin.password, (err, isMatch) => {
              if (err) {
                throw err;
              }
              if (isMatch) {
                res.redirect("/manage");
                console.log("Admin login successful!");
              } else {
                const errors = [{ message: "Incorrect Email or Password" }];
                console.log("Incorect");
                res.render("login", { errors });
              }
            });
          } else {
            const errors = [{ message: "Incorrect Email or Password" }];
            res.render("login", { errors });
          }
        });
      } 
      else {
        client.query("SELECT * FROM Student WHERE email = $1", [email], (error, results) => {
          if (error) {
            throw error;
          } else if (results.rows.length > 0) {
            const student = results.rows[0];
            bcrypt.compare(password, student.password, (err, isMatch) => {
              if (err) {
                throw err;
              }
              if (isMatch) {
                res.redirect("/support");
                console.log("User login successful!");
              } else {
                const errors = [{ message: "Incorrect Email or Password" }];
                res.render("login", { errors });
              }
            });
          } else {
            const errors = [{ message: "Incorrect Email or Password" }];
            res.render("login", { errors });
          }
        });
      }
    } catch (error) {
      console.log("error", error);
      const message = "Login failed";
      res.render("login", { message });
    }
  });
  


app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));