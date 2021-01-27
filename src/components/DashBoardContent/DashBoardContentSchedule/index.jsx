import { Badge, Calendar, Popover } from 'antd';
import formatLessons from 'global/functions/formatLesson';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./style.scss";

const CalendarMobile = React.lazy(() => import("components/CalendarMobile"));

function getRandomColor() {
  let color = Math.floor(Math.random() * 16777215);
  return `#${color.toString(16)}`;
}

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

  const dateCellRender = (value) => {
    const listSubjects = getSubjects(value);
    if (listSubjects.length > 0)
      return (
        <div>
          {
            mobile
              ? <Badge count={listSubjects.length} />
              :
              <ul className="DashBoardContent_Schedule__Calender__events">
                {listSubjects.map(item => (
                  <Popover placement="right" trigger="hover" style={{ backgroundColor: getRandomColor() }}
                    title={<b>{item.subjectName} ({item.subjectCode})</b>}
                    content={
                      <div>
                        <p>Lớp: <b>{item.className}</b></p>
                        <p>Thời gian: <b>{item.day} {formatLessons(item.lesson, 1)}</b></p>
                        <p>Phòng: <b>{item.room}</b></p>
                        <p>Giáo viên: <b>{item.teacher}</b></p>
                      </div>
                    }
                    key={item.subjectCode + item.day}
                  >
                    <li style={{ backgroundColor: getRandomColor() }}>{item.subjectName}</li>
                  </Popover>
                ))}
              </ul>
          }
        </div >
      );
  }

  const getSubjects = (value) => {
    let listSubjects = [];
    value = value.format("DD-MM-YYYY").split("-");
    if (schedule.length > 0)
      schedule.forEach(item => {
        let day = item.day.split("/");
        if (Number(value[0]) === Number(day[0])
          && Number(value[1]) === Number(day[1])
          && Number(value[2]) === Number(day[2])) listSubjects.push(item);
      });

    return listSubjects;
  }

  const [subjects, setSubjects] = useState(getSubjects(moment()));

  const validRange = () => {
    let firsDay = schedule[0].day.split("/").reverse().join("");
    let lastDay = String(Number(schedule[schedule.length - 1].day.split("/").reverse().join("")) + 1);
    return [moment(firsDay), moment(lastDay)];
  }

  const onSelect = (value) => {
    const listSubjects = getSubjects(value);
    setSubjects(listSubjects);
  }

  return (
    schedule.length > 0 ?
      <div className="DashBoardContent_Schedule">
        <Calendar
          fullscreen={!mobile}
          dateCellRender={dateCellRender}
          className="DashBoardContent_Schedule__Calender"
          validRange={validRange()}
          onSelect={onSelect}
        />
        {mobile && <CalendarMobile subjects={subjects} />}

      </div >
      : <h2>Bạn không có lịch học</h2>
  );
}

export default DashBoardContent_Schedule;