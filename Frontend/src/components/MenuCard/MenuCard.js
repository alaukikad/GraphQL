import React, {Component} from 'react';
import '../../App.css';

import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { graphql, compose, withApollo } from "react-apollo";
import {getMenuQuery,getSectionQuery } from "../../queries/queries";

let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

let goToCart=false;
let quant=new Map();

let secList=[];
let display;
let resp1=[];
let itemdetails = null;

class MenuCard extends Component {
    constructor(props){
            super(props);
            this.state = {  
                menu:[]
            } 
       
        this.checkOut = this.checkOut.bind(this);    
        this.setQuantity = this.setQuantity.bind(this);
    }  
   
    componentDidMount(){
        this.props.client
        .query({
          query: getMenuQuery,
          variables: {
            email: "pam@pam.com"
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
   
   
setQuantity=(name,price,e)=>{
   
    }

checkOut=(e)=>{
   
}

    render(){
        display=[]
        let sectionDetails= secList.map(sec => {
            console.log("in section Display")
            console.log(sec)
            let secItems=this.state.menu.filter(item=> item.sid == sec)
            display.push(
                <div>
                <div style={{display:"Flex"}}>
                <h4>{sec}</h4>
                </div>  
                <table class="table">
                    <tbody>
                        {/*Display the Tbale row based on data recieved*/}
                        {itemdetails}   
                    </tbody>
                    </table>
                </div>)
                 itemdetails =secItems.map(item =>  {
                    console.log("Hello There")
                    console.log(item)
                    display.push(
                        <tr>
                            <td> 
                            <img
                            src=""
                            id="itemimg"
                            style={{height: "60px",width:"90px", margin : "10px"}}
                            alt="Item Display"/>
                            </td>
                            <td><div style={{margin : "10px"}}>{item.itemname}</div></td>
                            <td><div style={{margin : "10px"}}>{item.desc}</div></td>
                            <td><div style={{margin : "10px"}}>${item.price}</div></td>
                            <td><input type="text" name={item.itemname} pattern="[0-9]*" onChange={this.setQuantity.bind(item.itemname,item.price,this)} style={{width:"50px"}}></input></td>
                        </tr> 
                    )
                })
        })
        
    
        display.push(
            <div>
                {sectionDetails}
             </div>
                   
        )
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(cookie.load('cookie')=="restaurant"){
            redirectVar = <Redirect to= "/login"/>
        }
      let goForward=null;
      if(goToCart){
          goToCart=false;
         redirectVar = <Redirect to= "/cart"/>
        }

        return(
            <div style={{margin:"5%"}}>
                {redirectVar}
                {goForward}
                <div style={{backgroundColor:"white",marginLeft:"2%",opacity:"80%",overflowY:"auto"}}>
                <div>
                   <h2 style={{color:"red"}}>{this.state.restName}</h2>
                   <hr></hr>
                   {display}
                    <a class="btn btn-primary2" onClick={this.checkOut.bind(this)}>Check Out</a>
                   </div>
                </div>  
            </div> 
        )}
}

export default compose(
    withApollo,
    graphql(getMenuQuery, { name: "getMenuQuery" }),
    graphql(getSectionQuery, { name: "getSectionQuery" }),
  )(MenuCard);
