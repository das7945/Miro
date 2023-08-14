module.exports.isLoggedIn = (req, res, next) => {
  // 인증된 사용자가 아니라면...
  if (!req.isAuthenticated()) {
    req.flash("error", "로그인 후 추가할수 있습니다.");
    return res.redirect("/login");
  }
  next();
};
