import formatLessons from "global/functions/formatLesson";
import React from 'react';
import "./style.scss";

function getRandomColor() {
  let color = Math.floor(Math.random() * 16777215);
  return `#${color.toString(16)}`;
}

function CalendarMobile(props) {
  const { subjects } = props;

  return (
    <div className="CalendarMobile">
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
  );
}

export default CalendarMobile;