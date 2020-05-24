import React, { useState, useEffect, Fragment } from "react";
import ReactCalendar from "react-calendar";
import "./calendar.css";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import moment from "moment";

const Calendar = () => {
  // 초기값을 오늘로 설정
  const [date, onDateChange] = useState(new Date());

  // 비활성화 시킬 날짜의 배열
  const [disabledDates, setDisabledDates] = useState([new Date(0, 0, 0)]);

  // 받아온 인자를 Date 오브젝트의 배열로 변환하고 그것을 disabledDates에 할당하는 함수
  const handleDayoff = (date) => {
    const dateArray = [];
    const result = [];

    // dayoff 를 [YYYY,MM,DD] 형태로 변환한 후 dateArray에 할당
    date.forEach((date) => {
      dateArray.push(date.holiday.split("-"));
    });

    dateArray.forEach((date) => {
      result.push(
        new Date(parseInt(date[0]), parseInt(date[1] - 1), parseInt(date[2]))
      );
    });

    setDisabledDates(result);
  };

  const fetchData = async () => {
    try {
      await axios.get("https://exam.freshcode.me/front/dayoff").then((res) => {
        // res를 handleDayoff 함수로 넘김
        handleDayoff(res.data.holidays);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <h1>3. Calendar</h1>
      <div className="calendar-container">
        <ReactCalendar
          onChange={onDateChange}
          value={date}
          tileDisabled={({ date, view }) =>
            view === "month" &&
            disabledDates.some(
              (disabledDate) =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getDate() === disabledDate.getDate()
            )
          }
        />
        <div className="calendar-status">
          <div className="calendar-status_description_wrapper">
            <div className="calendar-status_description">
              <div className="square yellow"></div> : today (
              {new Date().toLocaleDateString()})
            </div>
            <div className="calendar-status_description">
              <div className="square gray"></div> : dayoff (선택할 수 없음)
            </div>
          </div>
          선택한 날짜: {moment(date.toLocaleDateString()).format("YYYY-MM-DD")}
        </div>
      </div>
    </Fragment>
  );
};

export default Calendar;
