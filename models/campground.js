const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

//쿼리미들웨어를 통한 삭제
// 몽구스의 모델삭제 메서드중 findOndAndDelete를 쓰고(몽구스사이트를 참고하여 사용) 그 다음 구문으로 사용자 메서드를 작성
// 클라이언트 페이지의 임의 페이지를 누를 경우 doc이라는 인자를 받아
// doc의 주소객체가 있을 경우 Review.deleteMany의 메서드에서 리뷰배열에서 삭제된 id(캠핑장글)를 가진 모든 리뷰를 삭제

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

// const Campground = mongoose.model("Campground", CampgroundSchema);

module.exports = mongoose.model("Campground", CampgroundSchema);
