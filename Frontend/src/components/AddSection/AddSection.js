import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { graphql, compose, withApollo } from "react-apollo";
import { addSectionMutation } from "../../mutation/mutation";
import { getMenuQuery } from "../../queries/queries";

let updateFlag=false;
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }
//Define a Login Component
class AddSection extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            sectionname : ""
        }
        //Bind the handlers to this class
        
       
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
  
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    //submit Register handler to send a request to the node backend
    submitForm= (e) => {
     

if(this.sectionname.value=="" ){
alert("Please fill Section Name Field!");
}else{
  
    console.log("here");
    this.props.addSectionMutation({
      variables: {
        email: localStorage.getItem('email'),
        sectionname:this.state.sectionname
      },
      refetchQueries: [{ query: getMenuQuery }]
    }).then(()=>{
        updateFlag=true;
    });
    alert("Section Added Successfully!");

}
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(localStorage.getItem('role')!="restaurant"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        if(localStorage.getItem('role')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        let goBack=null;
        if(updateFlag){
            goBack=window.location.reload();
        }
        return(
            <div>
                {redirectVar}
                {goBack}
            <div>
               <div>
               <h4>Add Section</h4>
                    <form>
                        <div class="form-group">
                                <input ref={(ref)=> this.sectionname=ref} style={{flex:"10",width :"80%"}} onChange = {this.onChangeHandler} type="text" class="form-control" name="sectionname" placeholder="Section Name" required/>
                            </div>
                           
                            <button onClick = {this.submitForm} class="btn btn-primary3" type="submit"> Add </button>                 

                            </form>
                    </div>
                   
                    </div>
            
            </div>
        )
    }
}

  export default compose(
    withApollo,
    graphql(getMenuQuery, { name: "getMenuQuery" }),
    graphql(addSectionMutation, { name: "addSectionMutation" })
  )(AddSection);