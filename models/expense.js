const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
{
	name: {
		type: String,
		required: true
	  },
	amount:{
		type: String,
		required: true
	  },
	description: {
		type: String,
		required: true
	  },
	date: 
	{type: Date, default: Date.now},
	credit:{
		type:String,
		required:true
	},
	debit:{
		type:String,
		required:true
	},
	owner:{
		id:
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
				
		},
	    usename:String
	}
});
module.exports  = mongoose.model("Expense", expenseSchema);