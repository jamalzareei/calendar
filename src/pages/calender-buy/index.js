import React, { useState } from 'react';

const CalenderExpertV2 = () => {

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
    const [itemSelect, setitemSelect] = useState([])

    

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
            setStart(week + 1);
        } else {
            setStart(week - 1);
        }
    }


    const onSelectTimes = (time) => (e) => {
        let newArray = selectTimes
        if (newArray.includes(time)) {
            newArray = newArray.filter(val => val !== time)
        } else {
            newArray = [...newArray, time];
        }
        setSelectTimes(newArray)
    }

    const converetDate = (day) => {
        return `${selectDay['year']}-${selectDay['month']}-${selectDay['day']} ${day}:00:00`
    }

    const selectItem = ([date, time]) => (e) => {
        console.log(date);
        setitemSelect([date, time])
    }

    return (
        <div>
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
                                    {`${dateWeek(start)['year']} ${dateWeek(start)['day']} ${monthNames[start]}`}
                                    -
                                    {`${dateWeek(start + 7)['year']} ${dateWeek(start + 7)['day']} ${monthNames[start + 7]}`}
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
                                        <button key={key} className={`btn btn-outline-secondary my-1 w-75 px-2 py-1 ${selectTimes.includes(converetDate(time)) ? 'btn-dark' : 'btn-outline-dark'}`} onClick={selectItem([`${dateWeek(day)['year']}-${dateWeek(day)['month']}-${dateWeek(day)['day']}`, `${("0" + time).slice(-2)}:00`])}>
                                            {("0" + time).slice(-2)}:00
                                        </button >
                                    )}
                                </span >
                            )}
                        </div>

                    </div>
                </div>
            </div>
            {console.log(itemSelect)}
            {itemSelect && itemSelect?.length > 0 &&
                <>
                    <div className="modal fade show" id="exampleModalCenter" style={{ display: "block" }}>
                        <div className="modal-dialog modal-dialog-centered" style={{ zIndex: 1056 }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Save Date</h5>
                                    <button type="button" className="btn-close" onClick={() => setitemSelect([])}></button>
                                </div>
                                <div className="modal-body">
                                    {/* <div className="card"> */}
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">Date</h5>
                                                <small>{itemSelect[0]}</small>
                                            </div>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">Time</h5>
                                                <small>{itemSelect[1]}</small>
                                            </div>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex w-100 justify-content-between">
                                                {/* <h5 className="mb-1">Online</h5> */}
                                                <small>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                                                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Activate the tick in case of online time</label>
                                                    </div>
                                                </small>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* </div> */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary">Save Time</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop fade show" onClick={() => setitemSelect([])}></div>
                    {/* <div class="close-modal-div-dark" onClick={() => setitemSelect([])} style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, background: 'rgb(0 0 0 / 42%)', left: 0, zIndex: 1 }}></div> */}
                </>
            }
        </div>
    );
};


export default CalenderExpertV2;