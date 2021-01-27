import { CloseOutlined, PlusCircleOutlined, PoweroffOutlined, ScheduleOutlined } from "@ant-design/icons";
import { notification } from "antd";
import Image from "cloudinary-react/lib/components/Image";
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./style.scss";

function DashBoardNavigation() {
  let history = useHistory();

  const studentProfile = useSelector(state => state.studentProfile);
  const avatarUrl = `https://ui-avatars.com/api/?background=random&name=${studentProfile.displayName}`;

  const handleClickCloseMenu = () => {
    document.getElementById("DashBoardNavigation").style.left = "-300px";
    document.getElementById("Overlay").style.display = "none";
  }
  const handleClickLogOut = () => {
    localStorage.clear();
    history.push("/");
  }

  useEffect(() => {
    const navLink = document.getElementsByClassName("DashBoardNavigation__item");
    for (let i = 0; i < navLink.length; i++) {
      navLink[i].onclick = () => {
        if (window.innerWidth < 993) {
          document.getElementById("DashBoardNavigation").style.left = "-300px";
          document.getElementById("Overlay").style.display = "none";
        }
      }
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      let deferredPrompt = e;

      let install = document.getElementById("install-app");
      install.style.display = "block";
      install.addEventListener("click", (e) => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice
          .then(choiceResult => {
            if (choiceResult.outcome === "accepted") {
              notification.success({
                message: "App đã được cài đặt thành công 🎉",
              });
              install.style.display = "none";
            }
          })
        deferredPrompt = null;
      });

    })
  }, []);

  return (
    <div className="DashBoardNavigation" id="DashBoardNavigation">
      <div className="DashBoardNavigation__header">
        <Image cloudName="db2nhrkkl" publicId="logo" width="96" />
      </div>
      <div className="DashBoardNavigation__main">
        <div className="DashBoardNavigation__item DashBoardNavigation__student">
          <img src={avatarUrl} alt="Avatar" className="DashBoardNavigation__student__avatar" />
          <div className="DashBoardNavigation__student__info">
            <span>{studentProfile.displayName}</span>
            <span>{studentProfile.studentCode}</span>
          </div>
        </div>
        <NavLink exact to="/dashboard" className="Link DashBoardNavigation__item" activeClassName="DashBoardNavigation__item--active">
          <ScheduleOutlined /><span className="DashBoardNavigation__item__title">Thời khóa biểu</span>
        </NavLink>
        {/* <ICalendarLink className="Link DashBoardNavigation__item">
          <CopyOutlined /><span className="DashBoardNavigation__item__title">Tải xuống .ics</span>
        </ICalendarLink> */}
        {/* <NavLink to="/dashboard/info" className="Link DashBoardNavigation__item" activeClassName="DashBoardNavigation__item--active">
          <InfoCircleOutlined /><span className="DashBoardNavigation__item__title">Thông tin</span>
        </NavLink> */}
        <div id="install-app" className="DashBoardNavigation__item">
          <PlusCircleOutlined /><span className="DashBoardNavigation__item__title">Cài đặt app</span>
        </div>
        <div className="DashBoardNavigation__item" onClick={handleClickLogOut}
          style={{ color: "red" }}
        >
          <PoweroffOutlined /><span className="DashBoardNavigation__item__title">Đăng xuất</span>
        </div>
      </div>
      <div className="DashBoardNavigation__closeMenu" onClick={handleClickCloseMenu}><CloseOutlined /></div>
    </div >
  );
}

export default DashBoardNavigation;

