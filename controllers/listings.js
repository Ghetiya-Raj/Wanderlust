const Listing = require("../models/listing");

module.exports.index = async(req,res)=>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings})
};

module.exports.renderNewForm = (req,res)=>{
  console.log(req.user);
  res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res)=>{
  let {id}=req.params;
  const listing = await Listing.findById(id).populate({path: "reviews",populate:{path: "author"},}).populate("owner");
  if(!listing){
     req.flash("error","Listing you requested for does not exist!");
     return res.redirect("/listings");
    }
    console.log(listing);
  res.render("listings/show.ejs",{listing}); 
};

module.exports.createListing = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing=new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","New Listing created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req,res)=>{
  let {id}=req.params;
  const listing = await Listing.findById(id);
  if(!listing){
     req.flash("error","Listing you requested for does not exist!");
     return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl =  originalImageUrl.replace("/upload","/upload/w_250");
  res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing = async(req,res)=>{
  let { id } = req.params;
  if(!req.body.listing){
    throw new ExpressError(400,"Send valid data for listing");
  }
  let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing},{runValidators:true});

  if(typeof req.file !== "undefined" ){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url,filename};
  await listing.save();
  }

  req.flash("success","Listing Upadated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req,res)=>{
  let{id}=req.params;
  let deletedlistingn = await Listing.findByIdAndDelete(id);
  console.log(deletedlistingn);
  req.flash("success","Listing Deleted!");
  res.redirect("/listings");
};