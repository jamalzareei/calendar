import React, { useState } from 'react';
import file from './data.json'

const CalenderExpertV2 = () => {
    // console.log(file);

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
    const [selectTimes, setSelectTimes] = useState(file)
    const [online, setOnline] = useState(false)



    const dayWeek = [
        "Su",//"Sunday",
        "Mo",//"Monday",
        "Tu",//"Tuesday",
        "We",//"Wednesday",
        "Th",//"Thursday",
        "Fr",//"Friday",
        "Sa",//"Saturday",
    ];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
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


    const onSelectTimes = (date, time) => (e) => {
        let newTime = {
            "date": date,
            "time": time,
            "online": online,
        }
        let newArray = selectTimes

        if (onGetOldSelected(newTime) !== null) {
            newArray = newArray.filter(v => !(v.date === newTime.date && v.time === newTime.time))// && v.online === newTime.online
        } else {
            newArray = [...newArray, newTime];
        }

        setSelectTimes(newArray)
    }

    const onGetOldSelected = (data) => {

        let newArray = selectTimes.filter(v => v.date === data.date && v.time === data.time)// && v.online === data.online

        return newArray.length > 0 ? newArray[0].online : null
    }
    const onGetOldSelectedOnline = (date, time) => {
        let newArray = selectTimes.filter(v => v.date === date && v.time === time)
        return newArray.length > 0 ? (newArray[0].online ? 'btn-secondary text-white online-rezerve' : 'btn-dark text-white presence-rezerve') : ''
    }

    const converetDate = (day) => {
        return `${selectDay['year']}-${selectDay['month']}-${selectDay['day']} ${day}:00:00`
    }

    // const selectItem = ([date, time]) => (e) => {
    //     console.log(date);
    //     setitemSelect([date, time])
    // }

    return (
        <div>
            {console.log(selectTimes)}
            <div className="row">
                <div className="col-md-4">

                </div>
                <div className="col-md-8">

                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-between">
                                <div className="col-1 pb-1 d-flex align-items-lg-stretch justify-content-end">
                                    <button className="btn btn-outline-secondary text-nowrap" onClick={changeWeek(start, 'prev')}>
                                        <span>&laquo;</span>
                                    </button>
                                </div>
                                <div className="col-10 scrollmenu pb-1 mx-1 d-flex align-items-center justify-content-center">
                                    {dateWeek(start)['year']} {dateWeek(start)['day']} {monthNames[Number(dateWeek(start)['month']) - 1]}({dateWeek(start)['month']})
                                    -
                                    {dateWeek(start + 7)['year']} {dateWeek(start + 7)['day']} {monthNames[Number(dateWeek(start + 7)['month']) - 1]}({dateWeek(start + 7)['month']})
                                </div>
                                <div className="col-1 pb-1 d-flex align-items-lg-stretch justify-content-start">
                                    <button className="btn btn-outline-secondary text-nowrap" onClick={changeWeek(start, 'next')}>
                                        <span>&raquo;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card p-2">
                        <div className="d-flex w-100 justify-content-between">
                            {/* <h5 className="mb-1">Online</h5> */}
                            <small className="col p-3">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={(e) => setOnline(!online)} checked={online} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                        Activate the tick in case of online time
                                        <br />
                                        (  <span class="badge bg-secondary">&nbsp;</span> online <span class="badge bg-dark">&nbsp;</span> presence  )
                                    </label>
                                </div>
                            </small>
                            {/* <small className="col-2 p-3 text-right">
                                <button className="btn btn-primary float-right">Save</button>
                            </small> */}
                        </div>
                        <div className="d-flex m-2 pb-3 border-bottom">
                            {numberRange(start, start + 6).map((day, key) =>
                                <span key={key} className={`col text-center ${day === 0 ? "border-bottom border-4" : ""}`}>
                                    {dayWeek[dateWeek(day)['dayweek']]}
                                    <br />
                                    <span className="small text-muted">{`${dateWeek(day)['month']}/${dateWeek(day)['day']}`}</span>
                                </span >
                            )}
                        </div>
                        <div className="d-flex">
                            {numberRange(start, start + 6).map((day, key) =>
                                <span key={key} className={`col pr-1 text-center `}>
                                    {numberRange(8, 23).map((time, key) =>
                                        <button key={key} className={
                                            `btn btn-outline-secondary my-1 w-75 px-2 py-1 
                                            ${onGetOldSelectedOnline(`${dateWeek(day)['year']}/${dateWeek(day)['month']}/${dateWeek(day)['day']}`, `${("0" + time).slice(-2)}:00:00`)}
                                            `}
                                            onClick={onSelectTimes(`${dateWeek(day)['year']}/${dateWeek(day)['month']}/${dateWeek(day)['day']}`, `${("0" + time).slice(-2)}:00:00`)}
                                        >
                                            {("0" + time).slice(-2)}
                                        </button >
                                    )}
                                </span >
                            )}
                        </div>
                        <div className="row p-3">
                            <button className="btn btn-primary btn-block">Save Data</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};


export default CalenderExpertV2;