import 'animate.css/animate.min.css';
import $ from "jquery";
import React, { useEffect, useState } from "react";
import generateCalendar, { month_names, week_day_names } from "./generateCalendar";
import "./style.scss";

function Calendar(props) {
  const [current, setCurrent] = useState(new Date());

  const onPanelChange = (type) => {
    //1 = prev, 2 = next
    const calendar_month_dates = $("#calendar-month-dates");
    if (calendar_month_dates.attr("class").split(" ").some(i => i === "animate__animated"))
      calendar_month_dates.removeClass("animate__animated animate__slideInLeft animate__faster");
    switch (type) {
      case 1: {
        calendar_month_dates.addClass("animate__animated animate__slideInLeft animate__faster");
        setTimeout(() => {
          calendar_month_dates.removeClass("animate__animated animate__slideInLeft animate__faster");
        }, 500)
        break
      }
      case 2: {
        calendar_month_dates.addClass("animate__animated animate__slideInRight animate__faster");
        setTimeout(() => {
          calendar_month_dates.removeClass("animate__animated animate__slideInRight animate__faster");
        }, 500)
        break
      }
      default: break

    }
  }

  const handleYearPrev = () => {
    onPanelChange(1);
    setCurrent(new Date(current.getFullYear() - 1, current.getMonth(), current.getDate()));
  }
  const handleYearNext = () => {
    onPanelChange(2);
    setCurrent(new Date(current.getFullYear() + 1, current.getMonth(), current.getDate()));
  }
  const handleMonthPrev = () => {
    onPanelChange(1);
    setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
  }
  const handleMonthNext = () => {
    onPanelChange(2);
    setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, current.getDate()));
  }
  const handleNow = () => {
    const now = new Date();
    let noww = {
      month: now.getMonth(),
      year: now.getFullYear()
    };
    let currentt = {
      month: current.getMonth(),
      year: current.getFullYear()
    }
    if (noww.month !== currentt.month || noww.year !== currentt.year) {
      if (noww.month < currentt.month || noww.year < currentt.year) {
        onPanelChange(1);
      }
      else if (noww.month > currentt.month || noww.year > currentt.year) {
        onPanelChange(2);
      }
      setCurrent(now);
    }
  }
  const handleMonthPicker = () => {
    const month_picker = $("#calendar-month-picker");
    month_picker.css("display", "grid").addClass("animate__animated animate__zoomIn animate__faster");
    setTimeout(() => {
      month_picker.removeClass("animate__animated animate__zoomIn animate__faster");
    }, 500);
  }

  useEffect(() => {
    generateCalendar(current, props);
    const month_picker_item = $(".calendar-month-picker-item");
    for (let i = 0; i < month_picker_item.length; i++) {
      month_picker_item[i].onclick = () => {
        const month_picker = $("#calendar-month-picker");
        month_picker.addClass("animate__animated animate__zoomOut animate__faster");
        setTimeout(() => {
          month_picker.css("display", "none").removeClass("animate__animated animate__zoomOut animate__faster");
        }, 500);
        if (i !== current.getMonth()) {
          setCurrent(new Date(current.getFullYear(), i, current.getDate()))
        }
      }
    }
  }, [current, props]);

  return (
    <div className="calendar" id="calendar">
      <div className="calendar-header">
        <div className="calendar-header-year">
          <span className="calendar-header-year-value" id="calendar-header-year-prev" onClick={handleYearPrev}></span>
        </div>
        <div className="calendar-header-month" id="calendar-header-month">
          <span className="calendar-header-month-change" id="calendar-header-month-prev" onClick={handleMonthPrev}>&lt;</span>
          <span className="calendar-header-month-value" id="calendar-header-month-value" onClick={handleMonthPicker}></span>
          <span className="calendar-header-month-change" id="calendar-header-month-prev" onClick={handleMonthNext}>&gt;</span>
        </div>
        <div className="calendar-header-year">
          <span className="calendar-header-year-value" id="calendar-header-year-next" onClick={handleYearNext}></span>
        </div>
        <div>
          <span className="calendar-header-now" id="calendar-header-now" onClick={handleNow}>Về hôm nay</span>
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-week-days">
          {
            week_day_names.map((item, key) => (
              <div key={key}>{item}</div>
            ))
          }
        </div>
        <div className="calendar-month-dates" id="calendar-month-dates">
        </div>
      </div>
      <div className="calendar-month-picker" id="calendar-month-picker">
        {
          month_names.map((item, key) => (
            <div className={key === current.getMonth() ? "calendar-month-picker-item-now calendar-month-picker-item" : "calendar-month-picker-item"} key={key}>
              {item}
            </div>
          ))
        }
      </div>
    </div >
  );
}

export default Calendar;