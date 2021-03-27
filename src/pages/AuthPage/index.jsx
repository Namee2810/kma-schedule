import React from 'react';
import "./style.scss";

const AuthForm = React.lazy(() => import("components/AuthForm"));

function AuthPage(props) {

  return (
    <div className="AuthPage" id="AuthPage">
      <AuthForm />
      <div className="AuthPage_footer">
        <div className="AuthPage_footer-tag">
          <span style={{ color: "red" }}>KMA</span> SCHEDULE
        </div>
        <div>
          Made by <a href="https://www.facebook.com/namee2810/" target="_blank" rel="noopener noreferrer">@Namee2810</a>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;