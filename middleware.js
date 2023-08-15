const { campgroundSchema, reviewSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Campground = require("./models/campground");

// 사용자가 로그인을 한 상태인지 확인하는 미들웨어
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

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
  // console.log(result);
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "권한이 없습니다.");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
