const Listing = require("../models/listing.js");
const axios = require("axios");
const mapToken=process.env.MAP_TOKEN;

const { cloudinary } = require("../cloudConfig.js");

module.exports.index=async(req,res)=>{
    const {category,search}=req.query;

    let filter={};
    if(category){
        filter.category=category;
    }
    if(search){
        const regex=new RegExp(search,'i');
        filter.title=regex;
    }
    allListings=await Listing.find(filter);

    res.render("listings/home.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/create.ejs");
}

module.exports.createListing=async (req,res)=>{
    
    //Details of created listings:
    const data=req.body.details;
    
    //Getting geolocation coordinates for address
    const query = `${data.location}, ${data.country}`;
    let geoRes = await axios.get('https://us1.locationiq.com/v1/search', {
        params: {
            key: mapToken,
            q: query,
            format: 'json',
            limit:1
        }
    });
    const lat = parseFloat(geoRes.data[0].lat);
    const lon = parseFloat(geoRes.data[0].lon);

    //Creating new listing
    const url=req.file.path;
    const filename=req.file.filename;
    const newListing=new Listing(data);
    newListing.image={url,filename};
    newListing.owner=req.user._id;
    newListing.geometry = {
        type: "Point",
        coordinates: [lon, lat]
    };
    
    await newListing.save();
    console.log("Listing added successfully:");
    console.log(newListing);
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}

module.exports.showListing=async(req,res)=>{

    //populating reviews(also details of authors of reviews using nested population by path method), owner details
    const listing=await Listing.findById(req.params.id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}

module.exports.renderEditForm=async(req,res)=>{
    const listing=await Listing.findById(req.params.id);
    if(!listing){
        req.flash("error","Listing not found!");
        return res.redirect("/listings");
    }

    let previewImgUrl=listing.image.url;
    previewImgUrl=previewImgUrl.replace("/upload","/upload/w_250");
    

    res.render("listings/edit.ejs",{listing,previewImgUrl});
}

module.exports.updateListing=async(req,res)=>{
    const listing=await Listing.findByIdAndUpdate(req.params.id,{...req.body.details});
    
    if(typeof req.file!= "undefined"){
        //Deleting old image (if it is in cloud=> filenmae!=listingimage) if new file uploaded
        if (listing.image.filename !== "listingimage") {
            await cloudinary.uploader.destroy(listing.image.filename);
        }
        //Getting url, filename of upladed image if new file is uploaded
        const url=req.file.path;
        const filename=req.file.filename;
        //Saving updated file details
        listing.image={url,filename};
        await listing.save();
    }

    //Getting geolocation coordinates for address, storing it in database
    const query = `${listing.location}, ${listing.country}`;
    let geoRes = await axios.get('https://us1.locationiq.com/v1/search', {
        params: {
            key: mapToken,
            q: query,
            format: 'json',
            limit:1
        }
    });
    const lat = parseFloat(geoRes.data[0].lat);
    const lon = parseFloat(geoRes.data[0].lon);
    listing.geometry = {
        type: "Point",
        coordinates: [lon, lat]
    };
    await listing.save();

    console.log("Listing edited, updated listing:");
    console.log(listing);
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${req.params.id}`);
}

module.exports.destroyListing=async(req,res)=>{
    const deletedlisting=await Listing.findByIdAndDelete(req.params.id);
    console.log("Listing deleted successfully:");
    console.log(deletedlisting);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
}