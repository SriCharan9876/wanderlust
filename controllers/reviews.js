const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError=require("../utils/ExpressError.js");

module.exports.createReview=async (req,res)=>{
    let listing=await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log(`Review added successfully: to ${listing.title}`);
    console.log(newReview);

    req.flash("success","Review added!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async(req,res)=>{
    let listing=await Listing.findByIdAndUpdate(req.params.id,{$pull:{ reviews: req.params.reviewId}});
    let review=await Review.findByIdAndDelete(req.params.reviewId);

    console.log("Review deleted successfully:");
    console.log(review);

    req.flash("success","Review deleted!");
    res.redirect(`/listings/${listing._id}`);
}
