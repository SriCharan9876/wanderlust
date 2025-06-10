const express=require("express");
const router=express.Router({mergeParams:true});

const wrapAsync=require("../utils/wrapAsync.js");

const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");

//Reviews routes

router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));     //Route to post review

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));     //Route to delete review

module.exports=router;