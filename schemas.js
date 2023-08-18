const Joi = require("Joi");

// 캠핑장 등록에 대한 서버에서의 유효성 검사
module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array(),
});

// 리뷰작성에 대한 서버에서의 유효성 검사
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }).required(),
});
