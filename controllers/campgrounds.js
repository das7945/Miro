const Campground = require("../models/campground");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
  // res.send(req.body);  <- 포스트 요청 내용 확인
  // if (!req.body.campground)
  //   throw new ExpressError("잘못된 캠핑장데이터 입니다.", 400);
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();
  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  // console.log(`req.user 내부 상황 ${req.user}`);
  campground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  // console.log(campground);
  req.flash("success", "캠핑장 등록을 성공했습니다.");
  res.redirect(`/campgrounds/${campground._id}`);
  console.log(campground.geometry);
};

module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)

    // **중첩채워넣기** (캠핑장상세보기창을 말함.)
    // 우리가 찾는 캠핑장에 리뷰 배열의 모든 리뷰를 채워 넣고
    // 각각의 리뷰에 작성자까지 채워 넣음.
    // 콘솔로그로 확인 할 것.  console.log(campground);
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  // console.log(campground);
  if (!campground) {
    req.flash("error", "캠핑장을 찾을 수 없습니다.");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "캠핑장을 찾을 수 없습니다.");
    return res.redirect("/campgrounds");
  }

  res.render("campgrounds/edit", { campground });
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  campground.images.push(...imgs);
  await campground.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
      // 파일명을 전달하면 업로더에서 해당파일을 삭제하는 destroy메서드
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
    console.log(campground);
  }
  req.flash("success", "캠핑장 업데이트가  성공적으로 되었습니다.");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "캠핑장 삭제가  성공적으로 되었습니다.");
  res.redirect(`/campgrounds`);
};
