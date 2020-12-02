const express = require('express');
//const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const app=express();
var ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
var flash = require('connect-flash')
var passport = require('passport');
var localStrategy = require('passport-local');
var passsportLocalMongoose = require('passport-local-mongoose');
var { v4: uuidv4 } = require('uuid');
console.log(uuidv4());


var User = require('./models/user')
var expenseRoutes = require('./routes/expense')
var authenticationRoutes = require('./routes/user')


//DB config
const db="mongodb://localhost:27017/yelp-camp";

//connect to mongo 
mongoose.connect(db, {
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(()=> console.log('MongoDB Connected...'))
.catch(err=> console.log(err));

//EJS
//app.use(expressLayouts);
app.set('view engine','ejs');
app.use(express.static('public'));
app.engine('ejs',ejsMate)
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));
app.use(flash())
//Bodyparser
app.use(express.urlencoded({ extended:false},{useUnifiedTopology : true }));


const PORT=process.env.PORT || 1800; //to deploy



//====Passport configuration=======
app.use(require("express-session")({
		secret: "Rusty wins !!!!",
		resave:false,
		saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
	res.locals.message = req.flash("error")
	next()
})


// //=====isloggedin========
function isloggedin(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/"); 
}

app.use(authenticationRoutes)
app.use(expenseRoutes)

app.use('/', require('./routes/front'));
app.use('/main',require('./routes/user'));
app.use('/aboutus',require('./routes/aboutus'));
app.listen(PORT, console.log(`server started on ${PORT}`));

