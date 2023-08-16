const express = require("express");

// ** Express라우터를 다룰 경우 주의 **
// 라우터가 매개변수를 각각 다루기 때문에
//  - app.use("/campgrounds/:id/reviews", reviews); :id <-- 부분
// { mergeParams: true } 옵션을 사용하여, app.js와 reviews.js의 매개변수가 병합 할 수 있음.
const router = express.Router({ mergeParams: true });

const reviews = require("../controllers/reviews");
const catchAsync = require("../utils/catchAsync");

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
