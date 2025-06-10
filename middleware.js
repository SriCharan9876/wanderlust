const ExpressError=require("./utils/ExpressError.js");

const Listing =require("./models/listing.js");
const Review = require("./models/review.js");

const {listingSchema, reviewSchema}=require("./schema.js");

//Listing schema validation function:
module.exports.validateListing=(req,res,next)=>{
    const result=listingSchema.validate(req.body);
    if(result.error){
        let errMsg=result.error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

//Review schema validation function:
module.exports.validateReview=(req,res,next)=>{
    const result=reviewSchema.validate(req.body);
    if(result.error){
        let errMsg=result.error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You should login to modify listings");
        return res.redirect("/login");
    };
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    };
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let listing=await Listing.findById(req.params.id);
    if(!listing){
        req.flash("error","Listing not found!");
        return res.redirect("/listings");
    }
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","Access denied to modify listing");
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let listing=await Listing.findById(req.params.id);
    if(!listing){
        req.flash("error","Listing not found!");
        return res.redirect("/listings");
    }
    let review=await Review.findById(req.params.reviewId);
    if(!review){
        req.flash("error","Review not found!");
        return res.redirect(`/listings/${req.params.id}`);
    }
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","Access denied to delete review");
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
}
