import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SigninSignupPage from "./pages/signin-signup/signin-signup.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentuser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log("mount called");
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        console.log("in componentdidmount ", userRef);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentuser: {
              id: snapShot.id,
              ...snapShot.data()
            },
          }, () => {console.log(this.state)});
        });
        
      }
      this.setState({ currentuser: userAuth });
    });
  }

  componentWillUnmount() {
    console.log("Unmount called");
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentuser={this.state.currentuser}></Header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SigninSignupPage}></Route>
        </Switch>
        {/* <HomePage></HomePage> */}
      </div>
    );
  }
}

export default App;
