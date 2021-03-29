import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import FaceIcon from '@material-ui/icons/Face';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import createIcsString from 'global/functions/createIcsString';
import React from 'react';
import { NavLink } from 'react-router-dom';
import "./style.scss";

function Nav(props) {
  const { studentCode, schedule } = props;

  const handleClickDownload = () => {
    let ics = createIcsString(schedule);
    let url = "data:text/calendar;charset=utf-8," + ics;

    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${studentCode}.ics`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  const handleClickSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload(false);
  }

  return (
    <div className="Nav" id="Nav">
      <div>
        <NavLink exact to="/" className="Nav_item" activeClassName="Nav_item-active">
          <EventAvailableOutlinedIcon style={{ fontSize: "34px" }} />
          <span className="Nav_item-title">Thời khóa biểu</span>
        </NavLink>
        <div className="Nav_item" onClick={handleClickDownload}>
          <CloudDownloadOutlinedIcon style={{ fontSize: "34px" }} />
          <span className="Nav_item-title">Xuất file .ics</span>
        </div>
        <NavLink to="/profile" className="Nav_item" activeClassName="Nav_item-active">
          <FaceIcon style={{ fontSize: "34px" }} />
          <span className="Nav_item-title">Thông tin sinh viên</span>
        </NavLink>
        <div className="Nav_item" onClick={handleClickSignOut} style={{ color: "red" }}>
          <PowerSettingsNewIcon style={{ fontSize: "34px" }} />
          <span className="Nav_item-title">Đăng xuất</span>
        </div>
      </div>
      <div className="Nav_footer">
        Made by <a href="https://www.facebook.com/namee2810/" target="_blank" rel="noopener noreferrer">@Namee</a>
      </div>
    </div>
  );
}

export default Nav;