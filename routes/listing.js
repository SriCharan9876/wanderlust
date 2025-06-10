const express=require("express");
const router=express.Router();

const wrapAsync=require("../utils/wrapAsync.js");

const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//Listings routes
router
    .route("/")
    .get(wrapAsync(listingController.index))    //Route to display all listings (Home page)
    .post(isLoggedIn, upload.single('details[image]'), validateListing, wrapAsync(listingController.createListing));     //Route to post created listing

router.get("/new",isLoggedIn, listingController.renderNewForm);     //Route to give form to create listing

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))     //Route to show particular listing
    .put(isLoggedIn, isOwner, upload.single('details[image]'), validateListing, wrapAsync(listingController.updateListing))     //Route to save edited listing
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));      //Route to delete listing

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)); //Route to edit particular listing after showing

module.exports=router;