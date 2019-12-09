import { gql } from "apollo-boost";

const userRegisterMutation = gql`
  mutation AddUser(
    $name: String
    $email: String
    $password: String
    $address: String
    $contact: String
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      address: $address
      contact: $contact
    ) {
      name
    }
  }
`;

const restaurantRegisterMutation = gql`
  mutation AddRestaurant(
    $name: String
    $email: String
    $password: String
    $address: String
    $contact: String
    $zipcode: String
    $oname: String
    $city: String
    $cuisine: String
  ) {
    addRestaurant(
      name: $name
      email: $email
      password: $password
      address: $address
      contact: $contact
      zipcode: $zipcode
      oname: $oname
      city: $city
      cuisine: $cuisine
    ) {
      name
    }
  }
`;

const restaurantUpdateMutation = gql`
  mutation UpdateRestaurant(
    $name: String
    $email: String
    $password: String
    $address: String
    $contact: String
    $zipcode: String
    $oname: String
    $city: String
    $cuisine: String
  ) {
    updateRestaurant(
      name: $name
      email: $email
      password: $password
      address: $address
      contact: $contact
      zipcode: $zipcode
      oname: $oname
      city: $city
      cuisine: $cuisine
    ) {
      name
    }
  }
`;

const userUpdateMutation = gql`
  mutation UpdateUser(
    $name: String
    $email: String
    $address: String
    $contact: String
  ) {
    updateUser(
      name: $name
      email: $email
      address: $address
      contact: $contact
    ) {
      name
    }
  }
`;

const userLoginMutation = gql`
  mutation UserLogin($email: String, $password: String) {
    userLogin(email: $email, password: $password) {
      name
    }
  }
`;

const restaurantLoginMutation = gql`
  mutation RestaurantLogin($email: String, $password: String) {
    restaurantLogin(email: $email, password: $password) {
      name
    }
  }
`;

const addItemMutation = gql`
  mutation addItem(
    $email: String,
    $itemname: String,
    $price: Int,
    $itemname: String,
    $sid: String,
    $cuisine: String,
    $name: String,
    $address: String,
  ) {
    addItem(
      email: $email,
      itemname: $itemname,
      price: $price,
      itemname: $itemname,
      sid: $sid,
      cuisine: $cuisine,
      name: $name,
      address: $address,
    ) {
      itemname
      email
    }
  }
`;

const addSectionMutation = gql`
  mutation addItem($email: String, $sectionname: String) {
    addItem(email: $email, sectionname: $sectionname) {
      name
    }
  }
`;

export {
  addItemMutation,
  addSectionMutation,
  userUpdateMutation,
  userRegisterMutation,
  restaurantRegisterMutation,
  userLoginMutation,
  restaurantLoginMutation,
  restaurantUpdateMutation
};
