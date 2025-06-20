const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const Listing = require('../models/listing');
const {isLoggedIn, isOwner,validateListing} =  require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js");
// const upload = multer({ dest:"uploads/"});   //store at this folder
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))  //index route
    .post(isLoggedIn,validateListing,upload.single('listing[image]'),wrapAsync((listingController.createListing))); //create route and here multer bring image data into file data

//new route

router.get("/new",isLoggedIn,listingController.renderNewForm);



router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))                                          //shoe route
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))     //update route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));                //delete route



//edit route

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;

