import React from "react";
import ReactDOM from "react-dom";

const week_day_names = [
  "CN", "T2", "T3", "T4", "T5", "T6", "T7",
];
const month_names = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7",
  "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function generateCalendar(current, props) {
  const { dateCellRender, onSelect, fullscreen } = props;
  current = {
    date: current.getDate(),
    month: current.getMonth(),
    year: current.getFullYear()
  };
  const now = (() => {
    const dateNow = new Date();
    return {
      date: dateNow.getDate(),
      month: dateNow.getMonth(),
      year: dateNow.getFullYear()
    }
  })();

  const month_date = document.getElementsByClassName("calendar-month-date");

  const startDay = new Date(current.year, current.month, 1).getDay();
  const calendar = document.getElementById("calendar-month-dates");
  let calendar_data = [];
  for (let i = 1; i <= getDaysInMonth(current.month + 1, current.year) + startDay; i++) {
    if (i > startDay) {
      calendar_data.push(React.createElement('div', {
        className: `calendar-month-date ${(i - startDay === now.date && current.month === now.month && current.year === now.year) ? 'calendar-month-date-now' : ""}`,
        key: i,
        onClick: () => {
          for (let j = 0; j < month_date.length; j++) {
            if (month_date[j].className.split(" ").some(item => item === "select")) {
              month_date[j].classList.remove("select");
              break;
            };
          }
          month_date[i - startDay - 1].classList.add("select");
          if (onSelect) onSelect({ date: i - startDay, month: current.month, year: current.year });
        }
      },
        React.createElement('div', {
          className: "calendar-month-date-value",
          key: i,
          style: {
            color: ((i - 1) % 7 === 0) && "#FD6519"
          }
        }, i - startDay),
        dateCellRender &&
        dateCellRender({ date: i - startDay, month: current.month, year: current.year }) && React.createElement('div', {
          className: "calendar-month-date-content",
          key: i + current.month + current.year
        }, dateCellRender({ date: i - startDay, month: current.month, year: current.year }))
      ))
    }
    else calendar_data.push(React.createElement('div', { key: i }));
  }
  ReactDOM.render(calendar_data, calendar);

  //change year
  const year_prev = document.getElementById("calendar-header-year-prev");
  ReactDOM.render(current.year - 1, year_prev);

  const year_next = document.getElementById("calendar-header-year-next");
  ReactDOM.render(current.year + 1, year_next);

  ReactDOM.render(`${month_names[current.month]}, ${current.year}`, document.getElementById("calendar-header-month-value"));

  //fullcreeen mode
  if (fullscreen === false) {
    document.getElementById("calendar").classList.add("calendar-small");
  }
  else {
    document.getElementById("calendar").classList.remove("calendar-small");
  }
}

export default generateCalendar;
export { month_names, week_day_names };

