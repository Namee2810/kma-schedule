import 'antd/dist/antd.css';
import Loading from "components/Loading";
import authenticateToken from 'global/functions/authenticateToken';
import "global/styles/style.scss";
import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';

const AuthPage = React.lazy(() => import("pages/AuthPage"));
const MainPage = React.lazy(() => import("pages/MainPage"));
//const PageNotFound = React.lazy(() => import("pages/PageNotFound"));

function App() {
  const [student, setStudent] = useState();
  const [schedule, setSchedule] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    if (!token) return;
    const decoded = authenticateToken(token); // undefined or string
    if (decoded) {
      setStudent(decoded.studentProfile);
      setSchedule(decoded.schedule);
    }
    else localStorage.removeItem("token");
  }, [token])
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" >
            {(student && schedule)
              ? <MainPage student={student} schedule={schedule} setToken={setToken} />
              : <AuthPage setToken={setToken} />}
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
