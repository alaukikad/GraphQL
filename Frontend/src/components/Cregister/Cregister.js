import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { graphql, compose } from 'react-apollo';
import { userRegisterMutation } from '../../mutation/mutation';

//Define a Login Component
class Cregister extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            fullname: "",
            contact: "",
            address : "",
            username : "",
            authFlag : "" 
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.fullnameChangeHandler = this.fullnameChangeHandler.bind(this);
        this.contactChangeHandler = this.contactChangeHandler.bind(this);
        this.addressChangeHandler = this.addressChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
   
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    addressChangeHandler = (e) => {
        this.setState({
            address : e.target.value
        })
    }

    contactChangeHandler = (e) => {
        this.setState({
            contact : e.target.value
        })
    }

    fullnameChangeHandler = (e) => {
        this.setState({
            fullname : e.target.value
        })
    }

    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    //submit Register handler to send a request to the node backend
      submitForm =(e) =>{
          console.log("here")
        this.props.userRegisterMutation({
            variables: {
            email: this.state.email,
            password: this.state.password,
            name: this.state.fullname,
            contact: this.state.contact,
            address : this.state.address
            }
         })
         alert("User added Successfully!")
     
    }
      
     
    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(localStorage.getItem('role')=="customer"){
            console.log('haha');
            redirectVar = <Redirect to= "/chome"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                <div class="login-form">
                    <div class="main-div">
                    <form>
                        <div class="panel">
                            
                            <h2>Customer Registration</h2>
                            
                        </div>
                        
                            <div class="form-group">
                                <input ref={(ref)=> this.fullname=ref} onChange = {this.fullnameChangeHandler} type="text" class="form-control" name="fullname" placeholder="Full Name" required/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.email=ref} onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.contact=ref} onChange = {this.contactChangeHandler} type="text" class="form-control" name="contact" placeholder="Contact"/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.address=ref} onChange = {this.addressChangeHandler} type="text" class="form-control" name="address" placeholder="Address"/>
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.password=ref} onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitForm} class="btn btn-primary" type="submit">Register</button>                 
                            <div style={{paddingTop:"10px"}}>
                            <a href="/login" >Already a member? Login</a>
                            </div>
                            </form>
                    </div>
                   
                </div>
            </div>
            </div>
        )
    }
}



export default 
    graphql(userRegisterMutation, { name: "userRegisterMutation" })
(Cregister);

