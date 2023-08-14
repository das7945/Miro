const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      console.log(registeredUser);
      req.flash("success", "환영합니다.");
      res.redirect("/campgrounds");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true, // 로그인 실패시 미들웨어에서 에러메세지를 출력해줌
    failureRedirect: "/login", // 로그인 실패시 미들웨어에서 옵션설정 화면으로 옮겨줌
  }),
  (req, res) => {
    req.flash("success", "매우 환영합니다.");
    res.redirect("/campgrounds");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "로그아웃 되었습니다.");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
