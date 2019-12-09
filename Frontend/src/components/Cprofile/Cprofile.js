import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { graphql,compose,withApollo } from "react-apollo";
import { getUserQuery } from "../../queries/queries";

class Cprofile extends Component {
    constructor(props){
            super(props);
            this.state = {  
                email : "",
                fullname: "",
                contact: "",
                address : "",
                oimage : ""
            }

    }  
    //get the books data from backend  
    componentDidMount(){
        this.props.client.query({
            query: getUserQuery,
            variables: {
              email: localStorage.getItem('email')
            }
          }).then(response => {
            console.log("get Customer profile", response.data.viewUser);
            this.setState({
                email : localStorage.getItem('email'),
                fullname: response.data.viewUser.name,
                contact: response.data.viewUser.contact,
                address :response.data.viewUser.address
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
        if(!localStorage.getItem('role')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(localStorage.getItem('role')=="restaurant"){
            redirectVar = <Redirect to= "/login"/>
        }

        return(
            <div>
                {redirectVar}
                <div class="container split left div-left" style={{width:"30%"}}>
                 
                           
                   <img
                src={this.props.oimage}
                id="dp"
                style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                alt="User Display"
              />
              </div>
             
                 
                <div class="container split right div-right" style={{backgroundColor:"white", width:"60%",opacity:"90%"}}>
                    
                    <h2>Customer Profile</h2>
                        <table class="table">
                            <tbody>
                               
                                <tr>
                                    <td>Full Name</td>
                                    <td>{this.state.fullname}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{this.state.address}</td>
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
                        <a class="btn btn-primary2" href="/cupdateprofile">Update</a>
                </div> 
               
            </div> 
        )
    }
}

export default compose(
    withApollo,
    graphql(getUserQuery, { name: "getUserQuery" })
  )(Cprofile);
