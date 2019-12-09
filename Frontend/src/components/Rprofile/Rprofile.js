import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { graphql,compose,withApollo } from "react-apollo";
import { getRestaurantQuery } from "../../queries/queries";

class Rprofile extends Component {
    constructor(props){
            super(props);
            this.state = {  
                email : "",
                fullname: "",
                contact: "",
                address : "",
                city : "",
                zipcode : "",
                restaurant : "",
                cuisine : "" ,
                rimage : "",
                oimage :""
            }

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
                src={this.props.rimage}
                id="dp"
                style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                alt="User Display"
                 />
                <img
                src={this.props.oimage}
                id="dp"
                style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                alt="User Display"
                />
                </div>
            
            {/* </div> */}
              
                <div class="container split right div-right" style={{backgroundColor:"white", width:"60%",opacity:"90%"}}>
                
                    <h2>Restaurant Profile</h2>
                        <table class="table">
                            <tbody>
                               
                                <tr>
                                    <td>Restaurant Name</td>
                                    <td>{this.state.restaurant}</td>
                                </tr>
                                <tr>
                                    <td>Owner Name</td>
                                    <td>{this.state.fullname}</td>
                                </tr>
                                <tr>
                                    <td>Cuisine</td>
                                    <td>{this.state.cuisine}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{this.state.address}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{this.state.city}</td>
                                </tr>
                                <tr>
                                    <td>Zipcode</td>
                                    <td>{this.state.zipcode}</td>
                                </tr>
                                <tr>
                                    <td>Contact </td>
                                    <td>{this.state.contact}</td>
                                </tr>
                                <tr>
                                    <td>Email </td>
                                    <td>{this.state.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a class="btn btn-primary2" href="/rupdateprofile">Update</a>
                </div> 
               
            </div> 
        )
    }
}

export default compose(
    withApollo,
    graphql(getRestaurantQuery, { name: "getRestaurantQuery" })
  )(Rprofile);