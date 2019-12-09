import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import AddItem from '../AddItem/AddItem';
import AddSection from '../AddSection/AddSection';
import { graphql, compose, withApollo } from "react-apollo";
import {getMenuQuery,getSectionQuery } from "../../queries/queries";

let secList;
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

class Rmenu extends Component {
    constructor(props){
            super(props);
            this.state = {  
                menu:[],
                section:[],
                options:[]
            }
            secList=[];
            this.editSection = this.editSection.bind(this);
            this.deleteSection = this.deleteSection.bind(this);
    }  
   
    componentDidMount(){
        this.props.client
        .query({
          query: getMenuQuery,
          variables: {
            email: localStorage.getItem("email")
          }
        })
        .then(response => {
          console.log("get Restaurant profile", response.data.getMenu);
          this.setState({
            menu : this.state.menu.concat(response.data.getMenu) 
        });
        }).then(() => {
            this.props.client
              .query({
                query: getSectionQuery,
                variables: {
                  email: localStorage.getItem("email")
                }
              })
              .then(response => {
                secList=response.data.viewSection;
                this.setState({
                  options: response.data.viewSection
                });
              });
       
        
    });
       
    }
   
    editItem=(value)=>{
       
    }

    editSection=(value)=>{
        
    }

    deleteSection=(value)=>{
       
    }


    deleteItem=(value)=>{
       
    }

    render(){
        let display=[]
        
        let sectionDetails= secList.forEach(sec => {
         //  setTimeout(() => {
               
            let itemdetails=null;
            let secItems=this.state.menu.filter(item=> item.sid == sec)
            
            display.push(
                <div>
                <div style={{display:"Flex"}}>
                <h4>{sec}</h4>
                <a class="glyphicon glyphicon-pencil" onClick={this.editSection.bind(this,sec.key)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a>
                <a class="glyphicon glyphicon-trash" onClick={this.deleteSection.bind(this,sec.key)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a>
                </div>  
                <table class="table">
                    
                    <tbody>
                        {/*Display the Tbale row based on data recieved*/}
                        {itemdetails}    
                    </tbody>
                    </table>
                </div>)
               itemdetails = secItems.map(item =>  {
                console.log(item.image)
                display.push(
                    <tr>
                    <td> <img
                    src="https://www.drdavidludwig.com/wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg"
                    id="itemimg"
                    style={{height: "60px",width:"90px", margin : "10px"}}
                    alt="Item Display"
                    /></td>
                        <td><div style={{margin : "10px"}}>{item.itemname}</div></td>
                        <td><div style={{margin : "10px"}}>{item.desc}</div></td>
                        <td><div style={{margin : "10px"}}>${item.price}</div></td>
                        <td><a class="glyphicon glyphicon-pencil" onClick={this.editItem.bind(this,item._id)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a></td>
                        <td><a class="glyphicon glyphicon-trash" onClick={this.deleteItem.bind(this,item._id)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a></td>
                       
                    </tr> 
                )
            }) 
        //}, 200);  
        })
   

        display.push(
            <div>
                {sectionDetails}
             </div>
                   
        )
   
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
                <div class="container split left div-left2" style={{backgroundColor:"white", width:"25%"}}>
                <AddSection/> 
        
                <AddItem/>
    
                </div>
                <div class="container split right div-right2" style={{backgroundColor:"white", width:"62%",opacity:"80%"}}>
               <h2 style={{color:"red"}}>Menu</h2>
               <hr></hr>
                {display}
                </div>  
            </div> 
        )}
}
//export Home Component
//export default Rmenu;

export default compose(
    withApollo,
    graphql(getMenuQuery, { name: "getMenuQuery" }),
    graphql(getSectionQuery, { name: "getSectionQuery" }),
  )(Rmenu);



