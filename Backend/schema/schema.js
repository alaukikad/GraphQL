const graphql = require("graphql");
const _ = require("lodash");
const Users = require("../models/Users");
const Restaurants = require("../models/Restaurants");
const Menu = require("../models/Menu");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data
// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' }
// ];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: GraphQLString }
  })
});

const RestaurantType = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: GraphQLString },
    zipcode: { type: GraphQLString },
    oname: { type: GraphQLString },
    city: { type: GraphQLString },
    cuisine: { type: GraphQLString },
    sectionname: { type: GraphQLString },
    section:{type: GraphQLList(MenuType)}
  })
});

const MenuType = new GraphQLObjectType({
  name: "Menu",
  fields: () => ({
    itemname: { type: GraphQLString },
    price: { type: GraphQLInt },
    sid: { type: GraphQLString },
    email: { type: GraphQLString },
    desc: { type: GraphQLString },
    cuisine: { type: GraphQLString },
    name: { type: GraphQLString },
    address: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    viewUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log("Inside User profile");

        console.log(args);
        return Users.findOne({ email: args.email });
      }
    },
    viewRestaurant: {
      type: RestaurantType,
      args: {
        email: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log("Inside Restaurant profile");
        console.log(args);

        return Restaurants.findOne({ email: args.email });
      }
    },
    viewSection: {
      type: GraphQLList(GraphQLString),
      args: {
        email: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log("Inside Section profile");
        console.log(args)
       let s;
       await Restaurants.find({ email: args.email },{section:1},function(err,resp){
          console.log(resp);
          s=resp[0].section
        })
        console.log(s)
        return s;
      }
    },
    getMenu: {
        type: GraphQLList(MenuType),
        args: {
          email: { type: GraphQLString }
        },
        async resolve(parent, args) {
          console.log("Inside Get Menu");
          console.log(args);
          return Menu.find({email: args.email}) ;
        }
      }
  }
});

var count = 10;
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
        contact: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log("Inside User Register");
        console.log(args);
        //console.log(parent);
        
        //my signup logic here
        var user = Users({
          name: args.name,
          email: args.email,
          contact: args.contact,
          address: args.address
        });

        await Users.find({ email: args.email }, function(err, result) {
          if (err) throw err;
          console.log(result);
          if (result.length != 0) {
            msg = "Email Already in Use!";
            //user=null;
          } else {
            bcrypt.hash(args.password, saltRounds, function(err, hash) {
              user.password = hash;
              console.log(hash);
            });
          }
        });
        return user.save();
      }
    },
    addRestaurant: {
      type: RestaurantType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
        contact: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        oname: { type: GraphQLString },
        city: { type: GraphQLString },
        cuisine: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log("Inside Restaurant Register Login");
        console.log(args);
        console.log(parent);
        var restaurant = Restaurants({
          name: args.name,
          email: args.email,
          oname: args.oname,
          contact: args.contact,
          address: args.address,
          city: args.city,
          zipcode: args.zipcode,
          cuisine: args.cuisine
        });
        Restaurants.find({ email: args.email }, function(err, result, fields) {
          if (err) throw err;
          console.log(result);
          if (result.length != 0) {
            msg = "Email Already in Use!";
            //user=null;
          } else {
            bcrypt.hash(args.password, saltRounds, function(err, hash) {
              restaurant.password = hash;
              console.log(hash);
            });
          }
        });

        return restaurant.save();
      }
    },
    userLogin: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        let passwordInDb = null,
          uname = null;
        console.log("Inside Login ");
        console.log(args);
        let user = await Users.findOne({ email: args.email }, function(
          err,
          result,
          fields
        ) {
          console.log(result);
          if (err) throw err;
        });
        if (user != null) {
          let valid = await bcrypt.compare(
            args.password,
            user.password,
            function(err, resp) {
              if (resp != true) {
                user = null;
              }
              console.log(resp);
            }
          );
        }

        return user;
      }
    },
    restaurantLogin: {
      type: RestaurantType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log("Inside Restaurant Login");
        console.log(args);
        let passwordInDb = null,
          uname = null;
        let rest = await Restaurants.findOne({ email: args.email }, function(
          err,
          result,
          fields
        ) {
          if (err) throw err;
        });
        let valid = await bcrypt.compare(args.password, rest.password, function(
          err,
          resp
        ) {
          if (resp != true) {
            rest = null;
          }
          console.log(resp);
        });
        return rest;
      }
    },
    updateUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: GraphQLString },
        contact: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log("Inside Customer profile update");
        console.log(args);
        return Users.findOneAndUpdate(
          { email: args.email },
          {
            name: args.name,
            address: args.address,
            contact: args.contact
          }
        );
      }
    },
    updateRestaurant: {
      type: RestaurantType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
        contact: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        oname: { type: GraphQLString },
        city: { type: GraphQLString },
        cuisine: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log("Inside Restaurant profile update");
        console.log(args);
        return Restaurants.findOneAndUpdate(
          { email: args.email },
          {
            name: args.name,
            address: args.address,
            contact: args.contact,
            oname: args.oname,
            city: args.city,
            zipcode: args.zipcode,
            cuisine: args.cuisine
          }
        );
      }
    },
    addSection: {
      type: RestaurantType,
      args: {
        email: { type: GraphQLString },
        sectionname: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log("Inside Add Section");
        console.log(args);
        return Restaurants.findOneAndUpdate(
          { email: args.email },
          { $push: { section: args.sectionname } }
        );
      }
    },
    addItem: {
      type: MenuType,
      args: {
        itemname: { type: GraphQLString },
        price: { type: GraphQLInt },
        sid: { type: GraphQLString },
        email: { type: GraphQLString },
        desc: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log("Inside Add Item");

        var menu1 = Menu({
          itemname: args.itemname,
          email: args.email,
          desc: args.description,
          price: args.price,
          sid: args.sid,
          cuisine: args.cuisine,
          name: args.name,
          address: args.address
        });

        console.log(args);
        // return Restaurants.findOneAndUpdate(
        //     { email: args.email },
        //     { $push: { menu: menu1} }
        //   );
        return menu1.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
