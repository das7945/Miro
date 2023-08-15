const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { campgroundSchema } = require("../schemas.js");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

const Campground = require("../models/campground");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res) => {
    // res.send(req.body);  <- 포스트 요청 내용 확인
    // if (!req.body.campground)
    //   throw new ExpressError("잘못된 캠핑장데이터 입니다.", 400);
    const campground = new Campground(req.body.campground);
    console.log(`req.user 내부 상황 ${req.user}`);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "캠핑장 등록을 성공했습니다.");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
      .populate("reviews")
      .populate("author");
    console.log(campground);
    if (!campground) {
      req.flash("error", "캠핑장을 찾을 수 없습니다.");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn, // 사용자가 로그인을 한 상태인지 확인하는 미들웨어
  isAuthor, // 왼쪽의 미들웨어만 존재해도 되지만 isLoggedIn과 같이 있으면
  // 더 구체적인 피드백을 얻을 수 있으며 로그인을 안했으면 로그인 페이지로
  // 리다이렉션을 통해 로그인하라고 함.
  // 미들웨어 순서상 isLoggedIn이 isAuthor보다 앞에 있기 때문에 선작업이 끝나 후
  // 문제가 없다면 isLoggedIn메서드 안에 마지막에 있는 next()를 통해 다음 미들웨어가
  // 진행하게 됨.
  // isLoggedIn 사용자가 로그인을 하고 있는 상태인지 인증을 하고,
  // 그 다음에 로그인 사용자에 대해 권한을 주기 위한 미들웨어가 isAuthor이다.
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "캠핑장을 찾을 수 없습니다.");
      return res.redirect("/campgrounds");
    }

    res.render("campgrounds/edit", { campground });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    req.flash("success", "캠핑장 업데이트가  성공적으로 되었습니다.");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "캠핑장 삭제가  성공적으로 되었습니다.");
    res.redirect(`/campgrounds`);
  })
);

module.exports = router;
