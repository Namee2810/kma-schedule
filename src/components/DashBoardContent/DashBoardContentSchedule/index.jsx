import { DownloadOutlined } from "@ant-design/icons";
import { Badge, Calendar, Popover, Tooltip } from 'antd';
import createIcsString from "global/functions/createIcsString";
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
  const [mobile, setMobile] = useState(false);
  const schedule = useSelector(state => state.schedule);
  const studentProfile = useSelector(state => state.studentProfile);

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

  const downloadIcsFile = () => {
    let ics = createIcsString(schedule);
    let url = "data:text/calendar;charset=utf-8," + ics;

    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${studentProfile.studentCode}.ics`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="DashBoardContent_Schedule">
      <Calendar
        fullscreen={!mobile}
        dateCellRender={dateCellRender}
        className="DashBoardContent_Schedule__Calender"
        validRange={validRange()}
        onSelect={onSelect}
      />
      {mobile && <CalendarMobile subjects={subjects} />}
      <Tooltip title="Tệp .ics có thể thêm vào các ứng dụng lịch trên Windows, Android, iOS và macOS (Microsoft Outlook, Google Calendar, Apple Calendar, ...)" placement="bottom">
        <button className="DashBoardContent_Schedule__ics button" style={{ backgroundColor: "#2ACC37", marginTop: "30px" }} onClick={downloadIcsFile}>
          <DownloadOutlined /> Tải xuống .ics
        </button>
      </Tooltip>

    </div >
  );
}

export default DashBoardContent_Schedule;