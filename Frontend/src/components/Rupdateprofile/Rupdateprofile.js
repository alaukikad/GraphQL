import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { graphql,compose, withApollo } from "react-apollo";
import { restaurantUpdateMutation } from "../../mutation/mutation";
import { getRestaurantQuery } from "../../queries/queries";

let config2 = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

class Rupdateprofile extends Component {
    constructor(props){
            super(props);
            this.state = {  
                rid : "",
                file1 : "",
                file2 : "",
                email : "",
                fullname: "",
                contact: "",
                address : "",
                city : "",
                zipcode : "",
                restaurant : "",
                username : "",
                cuisine : "",
                options : ["Indian", "Chinese", "Thai", "Italian"]

            }
  
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitProfile = this.submitProfile.bind(this);
    }  
    //get the books data from backend  
    componentWillMount(){
        this.props.client.query({
            query: getRestaurantQuery,
            variables: {
              email: localStorage.getItem('email')
            }
          }).then(response => {
            console.log("get Restaurant profile", response.data.viewRestaurant);
            this.setState({
                email : localStorage.getItem('email'),
                fullname: response.data.viewRestaurant.oname,
                contact: response.data.viewRestaurant.contact,
                address :response.data.viewRestaurant.address,
                city : response.data.viewRestaurant.city,
                zipcode :response.data.viewRestaurant.zipcode,
                restaurant : response.data.viewRestaurant.name,
                cuisine : response.data.viewRestaurant.cuisine 
            })
          }).catch(e => {
            console.log("error", e);
            this.setState({
            })
          })
        }
    cuisineChangeHandler = (value) => {
        console.log(value.value);
        this.setState({
            cuisine : value.value
        })
        
    }
    
    onChangeHandler = (e) => {
        this.setState({
           [e.target.name] : e.target.value
        });
    }
    submitProfile = (e) => {
        console.log("here");
    this.props.restaurantUpdateMutation({
      variables: {
        email: localStorage.getItem('email'),
        oname: this.state.fullname,
        contact: this.state.contact,
        address: this.state.address,
        city: this.state.city,
        zipcode: this.state.zipcode,
        name: this.state.restaurant,
        cuisine: this.state.cuisine
      },
      refetchQueries: [{ query: getRestaurantQuery }]
    });
    alert("Restaurant Updated Successfully!");
  };

    render(){
      
        //if not logged in go to login page
        let redirectVar = null;
        if(localStorage.getItem('role')!="restaurant"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        if(localStorage.getItem('role')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        return(
            <div>
                {redirectVar}
                
                <div class="container split left div-left" style={{ width:"30%"}}>
                {/* <div class="container" style={{backgroundColor:"white", borderRadius:"12px",height : "300px", width : "220px"}}> */}
                <img
                src={this.state.rimage}
                id="dp"
                style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                alt="User Display"
                 />
                <img
                src={this.state.oimage}
                id="dp"
                style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                alt="User Display"
                />
                </div>
                
                <div class="container split right div-right" style={{backgroundColor:"white", width:"60%",opacity:"90%"}}>
                    
                    <h2>Restaurant Profile</h2>
                    <form>
                        <table class="table">
                            <tbody>
                               
                                <tr>
                                    <td>Restaurant Name</td>
                                    <td><input value={this.state.restaurant} name="restaurant" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Owner Name</td>
                                    <td><input value={this.state.fullname} name="fullname" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Cuisine</td>
                            <td><Dropdown ref={ref => (this.cuisine = ref)}  options={this.state.options}  onChange={this.cuisineChangeHandler} name="cuisine" placeholder="Cuisine"  value={this.state.cuisine}  /></td>
                            </tr>
                                <tr>
                                    <td>Address</td>
                                    <td><input value={this.state.address} name="address" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td><input value={this.state.city} name="city" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Zipcode</td>
                                    <td><input value={this.state.zipcode} name="zipcode" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Contact </td>
                                    <td><input value={this.state.contact} name="contact" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Email </td>
                                    <td><input value={this.state.email} name="email" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Restaurant Image </td>
                                    <td><input  name="rimage" type="file" accept="image/png, image/jpeg" ></input></td>
                                </tr>
                                <tr>
                                    <td>Owner Image </td>
                                    <td><input  name= "oimage" type="file" accept="image/png, image/jpeg" ></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" onClick={this.submitProfile} class="btn btn-primary2">Submit</button>
                        </form>
                </div> 
              
               
            </div> 
        )
    }
}

export default compose(
    withApollo,
    graphql(getRestaurantQuery, { name: "getRestaurantQuery" }),
    graphql(restaurantUpdateMutation, { name: "restaurantUpdateMutation" })
  )(Rupdateprofile);
