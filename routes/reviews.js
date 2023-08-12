const express = require("express");

// ** Express라우터를 다룰 경우 주의 **
// 라우터가 매개변수를 각각 다루기 때문에
//  - app.use("/campgrounds/:id/reviews", reviews); :id <-- 부분
// { mergeParams: true } 옵션을 사용하여, app.js와 reviews.js의 매개변수가 병합 할 수 있음.
const router = express.Router({ mergeParams: true });

const Campground = require("../models/campground");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schemas.js");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "리뷰작성이 되었습니다.");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "리뷰삭제가 되었습니다.");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
