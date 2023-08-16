const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const { storeReturnTo } = require("../middleware");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true, // 로그인 실패시 미들웨어에서 에러메세지를 출력해줌
      failureRedirect: "/login", // 로그인 실패시 미들웨어에서 옵션설정 화면으로 옮겨줌
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
