import $ from "jquery";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./style.scss";

//const CalendarMobile = React.lazy(() => import("components/CalendarMobile"));
const CalendarDesktop = React.lazy(() => import("components/CalendarDesktop"));

function DashBoardContent_Schedule(props) {
  const schedule = useSelector(state => state.schedule);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth > 992) {
        $("#DashBoardNavigation").css("left", "0");
        $("#Overlay").css("display", "none");
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();

  }, []);

  return (
    schedule.length > 0 ?
      <div className="DashBoardContent_Schedule">
        <CalendarDesktop schedule={schedule} />
      </div >
      : <h2>Bạn không có lịch học</h2>
  );
}

export default DashBoardContent_Schedule;