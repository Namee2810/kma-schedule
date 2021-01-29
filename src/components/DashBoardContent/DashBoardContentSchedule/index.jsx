import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./style.scss";

const CalendarMobile = React.lazy(() => import("components/CalendarMobile"));
const CalendarDesktop = React.lazy(() => import("components/CalendarDesktop"));

function DashBoardContent_Schedule(props) {
  const schedule = useSelector(state => state.schedule);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth > 992) {
        document.getElementById("DashBoardNavigation").style.left = "0";
        document.getElementById("Overlay").style.display = "none";
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();

  }, []);

  return (
    schedule.length > 0 ?
      <div className="DashBoardContent_Schedule">
        <CalendarMobile schedule={schedule} className="DashBoardContent_Schedule__Mobile" />
        <CalendarDesktop schedule={schedule} className="DashBoardContent_Schedule__Desktop" />
      </div >
      : <h2>Bạn không có lịch học</h2>
  );
}

export default DashBoardContent_Schedule;