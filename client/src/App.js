import React, { Component, Fragment, Suspense, lazy } from 'react';
import Load from './loading';
import UserMang from './view/UserMang';
import Cart from './view/Cart';
import Inventory from './view/Inventory';
import Report from './view/reports';
import TopBar from './components/Topbar'
import SideBar from './components/SideBar'
import { Route, Switch, Redirect } from "react-router-dom";
import { getItem } from './utils/localStorage.js';
import './css/App.css';

const UserModal = lazy(() => import("./modals/UserModal"));
const ProductCart = lazy(() => import('./view/ProductCart'));
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (getItem('IS_ADMIN') == 1) ?
      <Component  {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  render() {
    if (!(getItem('ID_TOKEN') && getItem('EXPIRE') && Number(getItem('EXPIRE')) * 1000 > Date.now())) {
      return <Redirect from="/" to="/login" />;
    }
    return (
      <div class="wrapper">
        <TopBar />
        <SideBar />
        <div class="mainPanel">
          <div class="content">


            {/* <ProductCard /> */}
            {/* <ProductModal user={{}} /> */}
            <Suspense fallback={<Load />}>
              <Switch>
                <Route path="/app/board"
                  render={(props) => {

                    return (<UserModal user={{}} {...props} />);
                  }}
                />
                <Route path="/app/dashboard" component={ProductCart} />

                <ProtectedRoute path="/app/user" component={UserMang} />
                {/* <Route path="/app/user"
                  render={(props) => {

                    return (<UserMang users={users} {...props} />);
                  }} */}
                />
                <Route path="/app/invent" component={Inventory} />
                <Route path="/app/bill" component={Cart} />
                <Route path="/app/report" component={Report} />

              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
