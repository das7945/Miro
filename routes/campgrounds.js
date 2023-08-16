const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync");
const { campgroundSchema } = require("../schemas.js");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

// router.route의 경우 코드를 줄이는 방법중 하나인데,
// 만약 경로가 같고 get, put, post등 요청메서드만 다를 경우
// 메인으로 제일 상단에 하나를 고정한 뒤 그 다음줄에 하단과 같이 수정하면 코드를 줄일 수 있음.
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

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
  // 로그인 사용자에 대해 캠핑장 작성자인지 확인을 위한 미들웨어가 isAuthor이다.
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
