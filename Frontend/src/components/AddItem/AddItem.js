import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { graphql, compose, withApollo } from "react-apollo";
import { addItemMutation } from "../../mutation/mutation";
import { getRestaurantQuery, getSectionQuery,getMenuQuery } from "../../queries/queries";

let address, name, cuisine, email, rimage;

let updateFlag = false;
let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

//Define a Login Component
class AddItem extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      secList: [],
      itemname: "",
      description: "",
      price: "",
      image: "",
      section: "",
      options: [],
      address: "",
      restaurant: "",
      cuisine: "",
      rimage: ""
    };
    //Bind the handlers to this class

    this.sectionChangeHandler = this.sectionChangeHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.props.client
      .query({
        query: getRestaurantQuery,
        variables: {
          email: localStorage.getItem("email")
        }
      })
      .then(response => {
        console.log("get Restaurant profile", response.data.viewRestaurant);
        address = response.data.viewRestaurant.address
        name = response.data.viewRestaurant.name
        cuisine = response.data.viewRestaurant.cuisine
      })
      .then(() => {
        this.props.client
          .query({
            query: getSectionQuery,
            variables: {
              email: localStorage.getItem("email")
            }
          })
          .then(response => {
            this.setState({
              options: response.data.viewSection
            });
          });
      });
  }

  //email change handler to update state variable with the text entered by the user
  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  sectionChangeHandler = value => {
    console.log(value.value);
    this.setState({
      section: value.value
    });
  };

  //submit Register handler to send a request to the node backend
  submitForm = e => {

    e.preventDefault();
    const data = {
    
    };
    console.log(data);
    if (
      this.itemname.value == "" ||
      this.description.value == "" ||
      this.section.value == "" ||
      this.price.value == ""
    ) {
      alert("Please fill all Fields!");
    } else {
        alert("Item Added Successfully!");   
        this.props.addSectionMutation({
            variables: {
              email: localStorage.getItem('email'),
              itemname: this.state.itemname,
              description: this.state.description,
              price: this.state.price,
              sid: this.state.section,
              name: name,
              cuisine: cuisine,
              address: address
            },
            refetchQueries: [{ query: getMenuQuery }]
          }).then(()=>{
              updateFlag=true;
          });
            
    }
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if(localStorage.getItem('role')!="restaurant"){
        redirectVar = <Redirect to= "/rlogin"/>
    }
    if(localStorage.getItem('role')=="customer"){
        redirectVar = <Redirect to= "/rlogin"/>
    }
    let goBack = null;
    if (updateFlag) {
      console.log("Hello Addition");
      updateFlag = false;
      goBack = window.location.reload();
    }

    return (
      <div>
        {redirectVar}
        {goBack}
        <div>
          <form>
            <div class="panel">
              <h4>Add Item</h4>
            </div>
            <div class="form-group">
              <input
                ref={ref => (this.itemname = ref)}
                onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="itemname"
                placeholder="Item Name"
                required
              />
            </div>

            <div class="form-group">
              <input
                ref={ref => (this.description = ref)}
                onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="description"
                placeholder="Description"
                required
              />
            </div>
            <div class="form-group">
              <Dropdown
                ref={ref => (this.section = ref)}
                options={this.state.options}
                onChange={this.sectionChangeHandler}
                name="section"
                placeholder="Section"
                value={this.state.section}
              />
            </div>
            <div class="form-group">
              <input
                ref={ref => (this.price = ref)}
                onChange={this.onChangeHandler}
                type="number"
                class="form-control"
                name="price"
                placeholder="Price"
                required
              />
            </div>

            <button
              onClick={this.submitForm}
              class="btn btn-primary3"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(getRestaurantQuery, { name: "getRestaurantQuery" }),
  graphql(getSectionQuery, { name: "getSectionQuery" }),
  graphql(getMenuQuery, { name: "getMenuQuery" }),
  graphql(addItemMutation, { name: "addItemMutation" })
)(AddItem);
