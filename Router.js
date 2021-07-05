var express = require("express");

var router = express.Router();

const Credintials = {
  email: "admin@gmail.com",
  password: "admin123",
};

router.post("/login", (req, res) => {
  if (
    req.body.email == Credintials.email &&
    req.body.password == Credintials.password
  ) {
    req.session.user = req.body.email;
    res.redirect("/route/dashboard");
    res.end("login succeed");
  } else {
    res.end("Invalid Username");
  }
});

//! Route for Dashboard

router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.send("Unauthorized User");
  }
});

//! Route for Logout

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.send("ERROR");
    } else {
      res.render('base', { title: "Express", logout: "Logout Successfully" });
    }
  });
});

module.exports = router;
