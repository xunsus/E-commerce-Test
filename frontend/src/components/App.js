import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import MainPage from "./mainpage";
import Details from "./Detail";
import SignUp from "../containers/Signup";
import AddItem from "./AddItem";
import Admin from "../containers/admin";
import CustomLayout from "../containers/Layout";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <CustomLayout {...this.props}>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/Add-Item" component={AddItem} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/post/:id" component={Details} />
          </Switch>
        </CustomLayout>
      </BrowserRouter>
    );
  }
}

export default App;
