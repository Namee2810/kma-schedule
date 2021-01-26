import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "./style.scss";

const DashBoardContentSchedule = React.lazy(() => import("./DashBoardContentSchedule"))
//const DashBoardContentInfo = React.lazy(() => import("./DashBoardContentInfo"))

function DashBoardContent(props) {
  return (
    <div className="DashBoardContent">
      <Switch>
        <Route exact path="/dashboard">
          <DashBoardContentSchedule />
        </Route>
        {/* <Route exact path="/dashboard/info">
          <DashBoardContentInfo />
        </Route> */}
      </Switch>
    </div>
  );
}

export default DashBoardContent;