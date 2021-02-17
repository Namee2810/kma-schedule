import { Badge, Popover } from 'antd';
import formatLessons from 'global/functions/formatLesson';
import React, { useEffect, useState } from 'react';
import Calendar from "ui/Calendar";
import "./style.scss";

function getRandomColor(day) {
  day = Number(day.split("/").join(""));
  let color = day.toString(16);
  if (color.length > 6) {
    color = color.slice(0, 6);
  }
  if (color.length < 6) color += "f";

  return `#${color}`;
}

function CalendarDesktop(props) {
  const [fullscreen, setFullscreen] = useState(true);
  const { schedule } = props;
  const getSubjects = (value) => {
    let listSubjects = [];
    if (schedule.length > 0)
      schedule.forEach(item => {
        let day = item.day.split("/");
        if (value.date === Number(day[0])
          && value.month + 1 === Number(day[1])
          && value.year === Number(day[2])) listSubjects.push(item);
      });

    return listSubjects;
  }
  const dateCellRender = (value) => {
    const listSubjects = getSubjects(value);
    if (listSubjects.length > 0)
      return (
        fullscreen ?
          <div>
            <ul className="CalendarDesktop__events">
              {listSubjects.map(item => (
                <Popover placement="right" trigger="hover"
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
                  <li style={{ backgroundColor: getRandomColor(item.day) }}>{item.subjectName}</li>
                </Popover>
              ))}
            </ul>
          </div>
          : <div><Badge dot style={{ marginRight: "8px" }} /></div>
      );
  }

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth > 768) {
        if (!fullscreen) setFullscreen(true);
      }
      else {
        if (fullscreen) setFullscreen(false);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();

  }, [fullscreen]);

  const onSelect = (value) => {
    setSubjects(getSubjects(value));
  }

  const [subjects, setSubjects] = useState(getSubjects((() => {
    const date = new Date();
    return { date: date.getDate(), month: date.getMonth(), year: date.getFullYear() }
  })()));

  return (
    <div>
      <Calendar fullscreen={fullscreen} dateCellRender={dateCellRender} onSelect={onSelect} />
      {
        !fullscreen && <div className="CalendarMobile__detail">
          {subjects.length > 0
            ? <div className="CalendarMobile__haveSubject">
              {subjects.map(item => (
                <div className="CalendarMobile__item" key={item.subjectCode + item.day}>
                  <div className="CalendarMobile__item__title" style={{ backgroundColor: getRandomColor(item.day) }}>{item.subjectName}</div>
                  <div className="CalendarMobile__item__content">
                    <p>Thời gian: <b>{item.day} {formatLessons(item.lesson, 1)}</b></p>
                    <p>Phòng: <b>{item.room}</b></p>
                    <p>Giáo viên: <b>{item.teacher}</b></p>
                  </div>
                </div>
              ))}
            </div>
            : <div className="CalendarMobile__nonSubject">
              <p>Không có tiết học trong ngày này <span className="CalendarMobile__nonSubject__cry">😭</span>
              </p>
            </div>}
        </div>
      }
    </div>
  );
}

export default CalendarDesktop;