import { DownOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { Image } from "cloudinary-react";
import React from 'react';
import "./style.scss";

const LoginForm = React.lazy(() => import("components/LoginForm"));

function LoginPage(props) {
  const handleClickLogin = () => {
    console.log(1);
    document.getElementById("LoginForm").style.transform = "translateY(-100vh)";
  }
  return (
    <div className="LoginPage" id="LoginPage">
      <Row>
        <Col md={10} sm={24} xs={24}>
          <div className="LoginPage__header">
            <div className="LoginPage__header__logo">
              <a href="/"><Image cloudName="db2nhrkkl" publicId="logo" /></a>
            </div>
            <h1 style={{ padding: "30px 0", fontSize: "75px", color: "white" }} className="LoginPage__header__title">KMA Schedule</h1>
            <button className="LoginPage__header__button button" onClick={handleClickLogin}>Đăng nhập <DownOutlined className="LoginPage__header__button--down" /></button>
            <div className="LoginPage__sign">
              <p>Created by <a href="https://www.facebook.com/namee2810/" target="_blank" rel="noopener noreferrer">Đào Nam</a></p>
            </div>
          </div>
        </Col>
        <Col md={14} sm={24} xs={24}>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;