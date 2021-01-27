import { MenuOutlined } from "@ant-design/icons";
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import "./style.scss";

function DashBoardHeader(props) {
  const studentProfile = useSelector(state => state.studentProfile);
  const avatarUrl = `https://ui-avatars.com/api/?background=random&name=${studentProfile.displayName}`;

  const handleClickOpenMenu = () => {
    document.getElementById("DashBoardNavigation").style.left = 0;
    document.getElementById("Overlay").style.display = "block";
  }

  return (
    <div className="DashBoardHeader" id="DashBoardHeader">
      <div className="DashBoardHeader__student">
        <div className="DashBoardHeader__student__info">
          <span>{studentProfile.displayName}</span>
          <span>{studentProfile.studentCode}</span>
        </div>
        <div><img src={avatarUrl} alt="Avatar" className="DashBoardHeader__student__avatar" /></div>
      </div>
      <NavLink to="/dashboard" className="DashBoardHeader__banner"><span>KMA</span>&nbsp;&nbsp;<span>Schedule</span></NavLink>
      <div className="DashBoardHeader__openMenu" id="DashBoardHeader__openMenu" onClick={handleClickOpenMenu}>
        <MenuOutlined />
      </div>
    </div >
  );
}

export default DashBoardHeader;
