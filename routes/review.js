const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const Listing = require('../models/listing');
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/reviews.js");



//Post Review Route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewcontroller.createReview));


//Delete Review Route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewcontroller.destroyReview));

module.exports = router;