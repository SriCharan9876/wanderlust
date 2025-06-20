const mongoose=require("mongoose");
const Schema= mongoose.Schema;
const Review=require("./review.js");

const {cloudinary} = require("../cloudConfig.js");

//Defining Schema for listings
const listingSchema=new Schema({
    title: {
        type:String,
        required:true,
    },
    description: String,
    image: {
        type:{
            filename:{
                type:String,
                default:"listingimage",
            },
            url:{
                type:String,
                default:"https://plus.unsplash.com/premium_vector-1721494020785-3da563960c97?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type: String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required: true
        }
    },
    category:{
        type:String,
        enum: ["beachfront","urban-stays","mountains","historic-gems","unique-stays","nature-rustic","luxury","ski-resorts","tropical"]
    }
});

//Defining middleware to delete linked reviews when a listing is deleted
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});

        if(listing.image.filename!="listingimage"){
            await cloudinary.uploader.destroy(listing.image.filename);
        }
        
    };
});

const Listing= mongoose.model("Listing", listingSchema);
module.exports=Listing;