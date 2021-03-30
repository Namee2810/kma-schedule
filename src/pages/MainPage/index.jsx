import Profile from 'components/Profile';
import Schedule from 'components/Schedule';
import React from 'react';
import { Route, Switch } from 'react-router';
import Header from "./Header";
import Nav from './Nav';
import "./style.scss";

function MainPage(props) {
  const { schedule, student } = props;
  return (
    <div className="MainPage">
      <Header student={student} />
      <Nav studentCode={student.studentCode} schedule={schedule} />
      <Switch>
        <Route exact path="/">
          <Schedule schedule={schedule} />
        </Route>
        <Route exact path="/profile">
          <Profile schedule={schedule} student={student} />
        </Route>
      </Switch>
    </div>
  );
}

export default MainPage;