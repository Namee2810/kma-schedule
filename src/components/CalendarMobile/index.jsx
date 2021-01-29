import { vi } from 'date-fns/locale';
import formatLessons from "global/functions/formatLesson";
import moment from "moment";
import React, { useState } from 'react';
import { DatePickerCalendar } from 'react-nice-dates';
import "./calendar.scss";
import "./style.scss";

function getRandomColor() {
  let color = Math.floor(Math.random() * 16777215);
  return `#${color.toString(16)}`;
}

function CalendarMobile(props) {
  const { schedule } = props;
  const [date, setDate] = useState(new Date())

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
  const onDateChange = (value) => {
    setDate(value);
    setSubjects(getSubjects(moment(value)))
  }
  const validRange = (option) => {
    let firstDay = schedule[0].day.split("/").reverse();
    let lastDay = schedule[schedule.length - 1].day.split("/").reverse();
    if (option === 1) return new Date(firstDay[0], firstDay[1] - 1, firstDay[2]);
    else return new Date(lastDay[0], lastDay[1] - 1, lastDay[2]);
  }
  const modifiers = {
    highlight: (date) => {
      return getSubjects(moment(date)).length > 0;
    }
  }
  const modifiersClassNames = {
    highlight: 'highlight'
  }

  return (
    <div className="CalendarMobile">
      <DatePickerCalendar
        date={date}
        locale={vi}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        minimumDate={validRange(1)}
        maximumDate={validRange(2)}
        onDateChange={onDateChange}
        className="CalendarMobile__calendar"
      />

      <div className="CalendarMobile__detail">
        {subjects.length > 0
          ? <div className="CalendarMobile__haveSubject">
            {subjects.map(item => (
              <div className="CalendarMobile__item" key={item.subjectCode + item.day}>
                <div className="CalendarMobile__item__title" style={{ backgroundColor: getRandomColor() }}>{item.subjectName}</div>
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

    </div>
  );
}

export default CalendarMobile;