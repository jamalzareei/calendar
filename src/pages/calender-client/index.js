import React, { useState } from 'react';
import file from '../../data/data.json'

const CalenderClient = () => {

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
    
    const [start, setStart] = useState(0)
    const [itemSelect, setitemSelect] = useState(null)
    const selectTimes = file

    

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

    const selectItem = (date, time) => (e) => {
        console.log(selectTimes.filter(v => v.date === date && v.time === time))
        let s = selectTimes.filter(v => v.date === date && v.time === time)
        if (s && s?.length > 0){
            setitemSelect(s[0])
        }
    }


    const onGetOldSelectedOnline = (date, time) => {
        let newArray = selectTimes.filter(v => v.date === date && v.time === time)
        return newArray.length > 0 ? (newArray[0].online ? 'btn-secondary text-white online-rezerve' : 'btn-dark text-white presence-rezerve') : 'disabled'
    }

    return (
        <div>
            {console.log(itemSelect)}
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
                        <div className="d-flex w-100 justify-content-between">
                            <small className="col p-3">
                                (  <span class="badge bg-secondary">&nbsp;</span> online <span class="badge bg-dark">&nbsp;</span> presence  )
                            </small>
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
                                            `btn btn-outline-secondary my-1 w-75 px-0 py-1 
                                            ${onGetOldSelectedOnline(`${dateWeek(day)['year']}-${dateWeek(day)['month']}-${dateWeek(day)['day']}`, `${("0" + time).slice(-2)}:00:00`)}
                                            `}
                                            onClick={selectItem(`${dateWeek(day)['year']}-${dateWeek(day)['month']}-${dateWeek(day)['day']}`, `${("0" + time).slice(-2)}:00:00`)}
                                        >
                                            {("0" + time).slice(-2)}
                                        </button >
                                    )}
                                </span >
                            )}
                        </div>

                    </div>
                </div>
            </div>
            
            {itemSelect &&
                <>
                    <div className="modal fade show" id="exampleModalCenter" style={{ display: "block" }}>
                        <div className="modal-dialog modal-dialog-centered" style={{ zIndex: 1056 }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Save Date</h5>
                                    <button type="button" className="btn-close" onClick={() => setitemSelect(null)}></button>
                                </div>
                                <div className="modal-body">
                                    {/* <div className="card"> */}
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">Date</h5>
                                                <small>{itemSelect?.date}</small>
                                            </div>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">Time</h5>
                                                <small>{itemSelect?.time}</small>
                                            </div>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex w-100 justify-content-between">
                                                {/* <h5 className="mb-1">Online</h5> */}
                                                <small>
                                                    <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={itemSelect?.online} />
                                                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Activate the tick in case of online time</label>
                                                    </div>
                                                </small>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* </div> */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary">Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop fade show" onClick={() => setitemSelect(null)}></div>
                    {/* <div class="close-modal-div-dark" onClick={() => setitemSelect(null)} style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, background: 'rgb(0 0 0 / 42%)', left: 0, zIndex: 1 }}></div> */}
                </>
            }
        </div>
    );
};


export default CalenderClient;