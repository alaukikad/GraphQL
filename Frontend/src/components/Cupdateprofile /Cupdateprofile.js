import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { graphql, compose, withApollo } from "react-apollo";
import { getUserQuery } from "../../queries/queries";
import { userUpdateMutation } from "../../mutation/mutation";

let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

class Cupdateprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      email: "",
      fullname: "",
      contact: "",
      address: "",
      file: "",
      oimage: ""
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
  }
  componentDidMount() {
    this.props.client
      .query({
        query: getUserQuery,
        variables: {
          email: localStorage.getItem("email")
        }
      })
      .then(response => {
        console.log("get Customer profile", response.data.viewUser);
        this.setState({
          email: localStorage.getItem("email"),
          fullname: response.data.viewUser.name,
          contact: response.data.viewUser.contact,
          address: response.data.viewUser.address
        });
      })
      .catch(e => {
        console.log("error", e);
        this.setState({});
      });
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitProfile = e => {
    console.log("here");
    this.props.userUpdateMutation({
      variables: {
        email: localStorage.getItem("email"),
        name: this.state.fullname,
        contact: this.state.contact,
        address: this.state.address
      },
      refetchQueries: [{ query: getUserQuery }]
    });
    alert("User Updated Successfully!");
  };
  render() {
    let redirectVar = null;
    if(!localStorage.getItem('role')){
        redirectVar = <Redirect to= "/login"/>
    }
    if(localStorage.getItem('role')=="restaurant"){
        redirectVar = <Redirect to= "/login"/>
    }
    return (
      <div>
        {redirectVar}
        <div class="container split left div-left" style={{ width: "30%" }}>
          <img
            src={this.state.oimage}
            id="dp"
            style={{
              border: "10px solid black",
              marginBottom: "10%",
              borderColor: "white",
              WebkitBorderRadius: "25%",
              height: "200px",
              width: "200px"
            }}
            alt="User Display"
          />
        </div>

        <div
          class="container split right div-right"
          style={{ backgroundColor: "white", width: "60%", opacity: "90%" }}
        >
          <h2>Customer Profile</h2>
          <form>
            <table class="table">
              <tbody>
                <tr>
                  <td>Full Name</td>
                  <td>
                    <input
                      value={this.state.fullname}
                      name="fullname"
                      onChange={this.onChangeHandler}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>
                    <input
                      value={this.state.address}
                      name="address"
                      onChange={this.onChangeHandler}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Contact </td>
                  <td>
                    <input
                      value={this.state.contact}
                      name="contact"
                      onChange={this.onChangeHandler}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Email </td>
                  <td>
                    <input
                      value={this.state.email}
                      name="email"
                      onChange={this.onChangeHandler}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Owner Image </td>
                  <td>
                    <input
                      name="oimage"
                      type="file"
                      accept="image/png, image/jpeg"
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="submit"
              onClick={this.submitProfile}
              class="btn btn-primary2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(getUserQuery, { name: "getUserQuery" }),
  graphql(userUpdateMutation, { name: "userUpdateMutation" })
)(Cupdateprofile);
