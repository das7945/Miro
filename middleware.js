module.exports.isLoggedIn = (req, res, next) => {
  // Passport에 의해 자동으로 세션에서 역직렬화된 정보가 req.user 들어감.
  // 세션의 직렬화된 사용자 정보를 Passport가 역직렬화해서 req.user에 해당 데이터 들어감.
  // console.log("req.user...", req.user); << 현재 사용자의 로그인유무 확인 방법

  // 인증된 사용자가 아니라면...
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "로그인 후 추가할수 있습니다.");
    return res.redirect("/login");
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
    console.log(res.locals.returnTo);
  }
  next();
};
