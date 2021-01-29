import { Calendar, Popover } from 'antd';
import formatLessons from 'global/functions/formatLesson';
import moment from "moment";
import React from 'react';
import "./style.scss";

function getRandomColor() {
  let color = Math.floor(Math.random() * 16777215);
  return `#${color.toString(16)}`;
}

function CalendarDesktop(props) {
  const { schedule } = props;

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

  const validRange = () => {
    let firstDay = schedule[0].day.split("/").reverse().join("");
    let lastDay = String(Number(schedule[schedule.length - 1].day.split("/").reverse().join("")) + 1);
    return [moment(firstDay), moment(lastDay)];
  }
  const dateCellRender = (value) => {
    const listSubjects = getSubjects(value);
    if (listSubjects.length > 0)
      return (
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
                <li style={{ backgroundColor: getRandomColor() }}>{item.subjectName}</li>
              </Popover>
            ))}
          </ul>
        </div >
      );
  }

  return (
    <div className="CalendarDesktop">
      <Calendar
        dateCellRender={dateCellRender}
        validRange={validRange()}
      />
    </div>
  );
}

export default CalendarDesktop;