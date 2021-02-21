import { MenuOutlined } from "@ant-design/icons";
import $ from "jquery";
import React from 'react';
import { useSelector } from "react-redux";
import "./style.scss";

function DashBoardHeader(props) {
  const studentProfile = useSelector(state => state.studentProfile);
  const avatarUrl = `https://ui-avatars.com/api/?background=random&name=${studentProfile.displayName}`;

  const handleClickOpenMenu = () => {
    $("#DashBoardNavigation").css("left", "0");
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
      <div className="DashBoardHeader__banner"><span>KMA</span>&nbsp;&nbsp;<span>Schedule</span></div>
      <div className="DashBoardHeader__openMenu" id="DashBoardHeader__openMenu" onClick={handleClickOpenMenu}>
        <MenuOutlined />
      </div>
    </div >
  );
}

export default DashBoardHeader;
