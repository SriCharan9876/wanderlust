if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
}

const express=require("express");
const app=express();
const port=8080;
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js")
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");

const User=require("./models/user.js");

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

//const mongoURL="mongodb://127.0.0.1:27017/wanderlust";
const dbUrl=process.env.ATLASDB_URL;

//Connecting Database
main()
    .then(()=>{
        console.log("Connected to DB");
    }).catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(dbUrl);
};

//Setting up view engine, views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

//Setting up other installed middlewares, ejsmate 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//Setting up session options for session related cookies using mongo session store:

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600  // 24 hours, should pass in seconds
});

store.on("error",(err)=>{
    console.log("error in Mongo session store",err)
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
};

//setting up session details, flash middlewares
app.use(session(sessionOptions));
app.use(flash());

//setting up passport session middlewares
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//Setting up strategy for authentication (basic local strategy used here)

passport.serializeUser(User.serializeUser());// Storing information related to user in session
passport.deserializeUser(User.deserializeUser());// Removing information related to user in session storage

app.use((req,res,next)=>{   //Middleware to pass flashmessage details/ logged in user details from reqest to response
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

//Creating listings, reviews routes
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//Throwing error for all invalid routes
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

//Error handling middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Some error occured"}=err;
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(port,()=>{
    console.log("Server is listening at port ",port);
});