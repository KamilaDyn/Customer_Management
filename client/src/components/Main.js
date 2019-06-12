import React from "react";
import { Switch, Route } from "react-router-dom";

import Customers from "./Customers";
import CustomerDetails from "./CustomerDetails";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Customers} />
      <Route exact path="/items/add" component={AddCustomer} />
      <Route exact path="/items/:id" component={CustomerDetails} />
      <Route exact path="/items/edit/:id" component={EditCustomer} />
    </Switch>
  </main>
);

export default Main;
