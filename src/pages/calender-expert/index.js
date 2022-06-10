import React, { useState } from 'react';
import ScrollHorizontal from '../../components/Svg/ScrollHorizontal';



const CalenderExpert = () => {

    const dateWeek = (countDay) => {

        var date = new Date();
        date.setDate(date.getDate() + countDay);

        return {
            "dayweek": date.getDay(),
            "day": ("0" + (date.getDate())).slice(-2),//date.getDate(),  
            "month": ("0" + (date.getMonth() + 1)).slice(-2),//  date.getMonth() + 1, 
            "year": date.getFullYear(),
        }
    }
    const [selectDay, setselectDay] = useState(dateWeek(0))
    const [start, setStart] = useState(0)
    const [selectTimes, setSelectTimes] = useState([])


    let dayWeek = [
        "Su",//"Sunday",
        "Mo",//"Monday",
        "Tu",//"Tuesday",
        "We",//"Wednesday",
        "Th",//"Thursday",
        "Fr",//"Friday",
        "Sa",//"Saturday",
    ];

    const onSelectDay = (day) => (e) => {
        setselectDay(dateWeek(day))
    }
    const numberRange = (start, end) => {
        return new Array(end - start + 1).fill().map((d, i) => i + start);
    }

    const changeWeek = (week, level) => (e) => {
        if (level === 'next') {
            setStart(week + 7);
        } else {
            setStart(week - 7);
        }
    }


    const onSelectTimes = (time) => (e) => {
        let newArray = selectTimes
        if (newArray.includes(time)) {
            newArray = newArray.filter(val => val !== time)
        } else {
            newArray = [ ...newArray, time];
        }
        setSelectTimes(newArray)
    }

    const converetDate = (day) => {
        return `${selectDay['year']}-${selectDay['month']}-${selectDay['day']} ${day}:00:00`
    }



    return (
        <div>
            <div className="row">
                <div className="col-md-12 offset-md-3-">
                    <div className="row ">

                        <div className="d-flex justify-content-between" style={{ position: 'relative', whiteSpace: 'nowrap' }}>
                            <div className="col-1 pb-1 d-flex align-items-lg-stretch justify-content-end">
                                <button className="btn btn-outline-secondary text-nowrap" onClick={changeWeek(start, 'prev')}>
                                    <span>&laquo;</span>
                                </button>
                            </div>
                            <span className="help-scroll-user">
                                <ScrollHorizontal />
                            </span>
                            <div className="col-10 scrollmenu pb-1 mx-1 d-flex align-items-center">
                                {numberRange(start, start + 6).map((day, key) => // selectDay === day
                                    <button key={key} className={`btn col mx-1 ${(JSON.stringify(selectDay) === JSON.stringify(dateWeek(day))) ? ' btn-primary  px-5 active' : ' btn-outline-secondary '}`} onClick={onSelectDay(day)}>
                                        {dayWeek[dateWeek(day)['dayweek']]}
                                        <br />
                                        {`${dateWeek(day)['year']}-${dateWeek(day)['month']}-${dateWeek(day)['day']}`}
                                    </button >
                                )}
                            </div>
                            <div className="col-1 pb-1 d-flex align-items-lg-stretch justify-content-start">
                                <button className="btn btn-outline-secondary text-nowrap" onClick={changeWeek(start, 'next')}>
                                    <span>&raquo;</span>
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="row ">

                        <div className="col-1">
                        </div>
                        {console.log(selectTimes)}
                        <div className="col-10">
                            <div className="card my-4 ">
                                <h5 className="card-header bg-secondary  text-white">Select time free</h5>
                                <div className="card-body">
                                    <div className="row">
                                        {numberRange(8, 23).map((day, key) => // selectDay === day
                                            <div key={key} className="col-3 d-grid">

                                                <button className={`btn my-2 btn-block  ${selectTimes.includes(converetDate(day)) ? 'btn-dark' : 'btn-outline-dark'}`} onClick={onSelectTimes(converetDate(day))}>
                                                    <span className="fw-bold">{day}-{day + 1}</span>
                                                    <br />
                                                    <small className={`${selectTimes.includes(converetDate(day)) ? '' : 'text-muted'}" small"`}>
                                                        {converetDate(day)}
                                                    </small>
                                                </button >
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1">
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalenderExpert;