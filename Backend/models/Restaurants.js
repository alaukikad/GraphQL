var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var RestaurantSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  contact:{type: Number},
  address:{type: String},
  zipcode:{type: Number},
  oname:{type: String},
  city:{type: String},
  cuisine :{type : String},
  section:{type:Array},
  menu:{type:Array}
},
{
    collection:"Restaurants"
});

var Restaurants = mongoose.model("Restaurants", RestaurantSchema,"Restaurants");
module.exports = Restaurants;