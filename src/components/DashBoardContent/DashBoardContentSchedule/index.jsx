import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./style.scss";

const CalendarMobile = React.lazy(() => import("components/CalendarMobile"));
const CalendarDesktop = React.lazy(() => import("components/CalendarDesktop"));

function DashBoardContent_Schedule(props) {
  const schedule = useSelector(state => state.schedule);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth > 768) setMobile(false);
      else setMobile(true);
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
        {
          mobile ? <CalendarMobile schedule={schedule} /> : <CalendarDesktop schedule={schedule} />
        }

      </div >
      : <h2>Bạn không có lịch học</h2>
  );
}

export default DashBoardContent_Schedule;