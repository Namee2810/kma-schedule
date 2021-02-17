import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Calendar, Popover, Radio, Typography } from 'antd';
import formatLessons from 'global/functions/formatLesson';
import moment from "moment";
import React, { useState } from 'react';
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
  const { schedule } = props;
  const [mode, setMode] = useState("month")

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
                <li style={{ backgroundColor: getRandomColor(item.day) }}>{item.subjectName}</li>
              </Popover>
            ))}
          </ul>
        </div >
      );
  }
  const onPanelChange = (value, mode) => {
    setMode(mode)
  }
  const onSelect = (value) => {
    if (mode === "year") setMode("month")
    if (mode === "month") {

    }
  }
  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    const month = value.month();
    const year = value.year();

    const onClickPreviousMonth = () => {
      const newValue = value.clone();
      newValue.month(month - 1);
      onChange(newValue);
    }
    const onClickNextMonth = () => {
      const newValue = value.clone();
      newValue.month(month + 1);
      onChange(newValue);
    }
    const onClickToday = () => {
      onChange(moment());
    }

    return (
      <div style={{ marginBottom: "10px" }}>
        <Typography.Title level={3}>{`Tháng ${month + 1}, ${year}`}</Typography.Title>
        <div className="CalendarDesktop__header">
          <div className="CalendarDesktop__changeMonth">
            <div onClick={onClickPreviousMonth} className="CalendarDesktop__changeMonth__item">
              <LeftOutlined />
            </div>
            <div onClick={onClickNextMonth} className="CalendarDesktop__changeMonth__item">
              <RightOutlined />
            </div>
            <div className="CalendarDesktop__today" onClick={onClickToday}><span>Về hôm nay</span></div>
          </div>
          <div className="CalendarDesktop__changeMode">
            <Radio.Group onChange={e => onTypeChange(e.target.value)} value={type}>
              <Radio.Button value="month">Tháng</Radio.Button>
              <Radio.Button value="year">Năm</Radio.Button>
            </Radio.Group>
          </div>
        </div >
      </div >
    )
  };

  return (
    <div className="CalendarDesktop">
      <Calendar
        mode={mode}
        dateCellRender={dateCellRender}
        validRange={validRange()}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        headerRender={headerRender}
      />
    </div>
  );
}

export default CalendarDesktop;