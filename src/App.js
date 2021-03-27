import 'antd/dist/antd.css';
import Loading from "components/Loading";
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import "global/styles/style.scss";
import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';

const AuthPage = React.lazy(() => import("pages/AuthPage"));
const DashBoardPage = React.lazy(() => import("pages/DashBoardPage"));
const PageNotFound = React.lazy(() => import("pages/PageNotFound"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Switch>
          <PublicRoute component={AuthPage} exact path="/" />
          <PrivateRoute component={DashBoardPage} path="/dashboard" />
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
