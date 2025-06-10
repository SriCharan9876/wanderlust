const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const mongoURL="mongodb://127.0.0.1:27017/wanderlust";
//Connecting Database
main()
    .then(()=>{
        console.log("Connected to DB");
    }).catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(mongoURL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({   // To add owner property for each object in intitData.data and set it to required ID
        ...obj,
        owner:"683304062f3a89d248bc4c07"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initiated");
};

initDB();