import { gql } from "apollo-boost";

let getUserQuery = gql`
  query viewUser($email: String) {
    viewUser(email: $email) {
      name
      email
      contact
      address
    }
  }
`;

const getRestaurantQuery = gql`
  query ViewRestaurant($email: String) {
    viewRestaurant(email: $email) {
      name
      email
      oname
      contact
      cuisine
      address
      city
      zipcode
    }
  }
`;

const getSectionQuery = gql`
  query viewSection($email: String) {
    viewSection(email: $email)
  }
`;

const getMenuQuery = gql`
  query getMenu($email: String) {
    getMenu(email: $email) {
        itemname
        price
        sid
        email
        desc
        cuisine
        name
        address
    }
  }
`;

export { getSectionQuery, getMenuQuery, getRestaurantQuery, getUserQuery };
