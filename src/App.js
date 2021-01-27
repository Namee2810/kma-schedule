import 'antd/dist/antd.css';
import Loading from "components/Loading";
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import "global/styles/style.scss";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

const LoginPage = React.lazy(() => import("pages/LoginPage"));
const DashBoardPage = React.lazy(() => import("pages/DashBoardPage"));
const PageNotFound = React.lazy(() => import("pages/PageNotFound"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            <PublicRoute component={LoginPage} exact path="/" />
            <PrivateRoute component={DashBoardPage} path="/dashboard" />
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
