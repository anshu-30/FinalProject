var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')

router.get('/main', (req,res) => 
	res.render('ansh')
);


 
//===signup logic==========
router.post("/register",async(req,res) => {
	  try{
	  	const{username,password} = req.body;
	  	const user = new User({username});
	  	const registeruser = await User.register(user,password)
		passport.authenticate("local")(req,res,()=>{
			req.flash("error","Welcome",user.username)
			res.redirect("/expense");
		})
	  	
	  }
      catch(e){
		 req.flash("error",e.message)
		 res.redirect("/main");
	  }
});	

	
//===login logic==========
router.post("/login",passport.authenticate("local",{
	successRedirect : "/expense",
	failureRedirect : "/main"
}),(req,res)=>{
	
});

router.get("/logout",(req,res)=>{
	req.logout();
	res.redirect("/main");
});

router.use((err,req,res,next)=>{
	console.log('error')
})


module.exports = router