import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import useModal from '../hooks/useModal';
import Modal from '../modals/Modal';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AttendanceAdmin = () => {

    const [time1, settime1] = useState("");
    const [time2, settime2] = useState("");

    const [response, setresponse] = useState("");

    const [present, setpresent] = useState(0);
    const [delay, setdelay] = useState(0);
    const [overtime, setovertime] = useState(0);
    const [undertime, setundertime] = useState(0);
    const [totaltime, settotaltime] = useState(0);

    const [loading, setloading] = useState(false);
    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const api = useAxiosPrivate();

    const navigate = useNavigate();

    const [sites, setsites] = useState([]);


    const [er, seter] = useState({ "er_no": "" });
    const [data, setdata] = useState([]);
    const [attendance, setattendance] = useState({
        "date": "-",
        "er_no": "-",
        "attendance": "-",
        "site_code": "-",
        "time": "-",
        "advance": "0",
        "remarks": "-",
        "food": "0",
        "travelling": "0"
    });


    const handlechangetime = (e) => {
        e.preventDefault();

        let val;

        val = e.target.value.split(":");

        if (e.target.name == "time1") {
            settime1(val);
        }

        if (e.target.name == "time2") {
            settime2(val);
        }

    }



    const extraworkinghours = () => {
        var startDate = new Date(0, 0, 0, 19, 30, 0);
        var endDate = new Date(0, 0, 0, time2[0], time2[1], 0);

        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        setresponse(hours + ":" + minutes);
        return [hours, minutes];

    }

    const underworkinghours = () => {
        var startDate = new Date(0, 0, 0, time2[0], time2[1], 0);
        var endDate = new Date(0, 0, 0, 18, 30, 0);

        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        setresponse(hours + ":" + minutes);
        return [hours, minutes];

    }


    const delayedhours = () => {
        var startDate = new Date(0, 0, 0, 9, 45, 0);
        var endDate = new Date(0, 0, 0, time1[0], time1[1], 0);

        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        setresponse(hours + ":" + minutes);
        return [hours, minutes];

    }

    const handleer = (e) => {
        e.preventDefault();
        let v = e.target.value.toUpperCase();
        seter({ "er_no": v });
    }

    const submitform = async (event) => {
        event.preventDefault();
        setloading(true);
        // console.log(er)

        try {
            await api.get(`employee/employee-get-one/${er.er_no}`).then(async function (response) {
                if (response.data.status == 1) {
                    // console.log(response.data.data)
                    setdata(response.data.data);
                    setattendance({
                        "date": "-",
                        "er_no": "-",
                        "attendance": "-",
                        "site_code": "-",
                        "time": "-",
                        "advance": "0",
                        "remarks": "-",
                        "food": "0",
                        "travelling": "0"
                    });
                    setloading(false);
                    setmodal(true);
                    await setmodalmessage({
                        "text1": "Done",
                        "text2": "ER Number Found."
                    });

                }
                else {
                    setdata([]);
                    setattendance({
                        "date": "-",
                        "er_no": "-",
                        "attendance": "-",
                        "site_code": "-",
                        "time": "-",
                        "advance": "0",
                        "remarks": "-",
                        "food": "0",
                        "travelling": "0"
                    });
                    setloading(false);
                    setmodal(true);
                    setmodalmessage({
                        "text1": "Error Occured",
                        "text2": "ER Number not Found."
                    });

                }

            });


        } catch (error) {
            setdata([]);
            setattendance({
                "date": "-",
                "er_no": "-",
                "attendance": "-",
                "site_code": "-",
                "time": "-",
                "advance": "0",
                "remarks": "-",
                "food": "0",
                "travelling": "0"
            });
            setloading(false);
            setmodal(true);
            setmodalmessage({
                "text1": "Error Occured",
                "text2": "No server response"
            });
        }

    }

    const handlechange = (e) => {
        e.preventDefault();

        setattendance(val => ({ ...val, "er_no": data[0].er_no }))

        const name = e.target.name;
        const value = e.target.value;

        if (value == "" || value == "Select..") {
            if (name == "food" || name == "travelling" || name == "advance") {
                setattendance(values => ({ ...values, [name]: "0" }));
            }
            else {
                setattendance(values => ({ ...values, [name]: "-" }));
            }
        }
        else {
            setattendance(values => ({ ...values, [name]: value }))

        }

    }


    const submitattendance = async (e) => {
        e.preventDefault();
        setloading(true);

        if (data[0].designation == "Office Staff") {
            if (time1 == "" || time2 == "") {
                setloading(false);
                setmodal(true);
                await setmodalmessage({
                    "text1": "Error",
                    "text2": "Please select both times."
                });
                return 0;
            }

            if (time1[0] > time2[0]) {
                setloading(false);
                setmodal(true);
                await setmodalmessage({
                    "text1": "Error",
                    "text2": "Please enter a valid time."
                });
                return 0;
            }

            if (time1[1] >= time2[1] && time1[0] == time2[0]) {
                setloading(false);
                setmodal(true);
                await setmodalmessage({
                    "text1": "Error",
                    "text2": "Please enter a valid time."
                });
                return 0;
            }

        }





        if (attendance.attendance == "-" || attendance.attendance == "Select.." || attendance.site_code == "-" || attendance.site_code == "Select..") {
            setloading(false);
            setmodal(true);
            await setmodalmessage({
                "text1": "Error",
                "text2": "Please select attendance and site code."
            });
            return 0;
        }

        try {
            await api.post(`attendance/attendance-register`, JSON.stringify(attendance)).then(async function (response) {
                // console.log(response)
                if (response.data.status == 1) {
                    setloading(false);
                    setmodal(true);
                    await setmodalmessage({
                        "text1": "Done",
                        "text2": "Attendance marked succesfully."
                    });

                    navigate('/');

                }
                else {
                    setloading(false);
                    setmodal(true);
                    await setmodalmessage({
                        "text1": "Error",
                        "text2": "Attendance already marked."
                    });
                }

            });

        } catch (error) {
            setloading(false);
            setmodal(true);
            setmodalmessage({
                "text1": "Error Occured",
                "text2": "No server response"
            });
        }
    }

    const getpendingsites = () => {
        setloading(true);

        api.get(`site/site-get-pending`).then(function (response) {
            if (response?.data?.data) {
                setsites(response.data.data);
                // console.log(response.data.data);

            }
            setloading(false);
        })
    }

    useEffect(() => {
        if (time1 != "" || time2 != "") {
            if (time1[0] > time2[0]) {
                console.log("In first if")
            }

            else if (time1[1] >= time2[1] && time1[0] == time2[0]) {
                console.log("In second if")
            }

            else if ((time1[0] >= 6 && time1[0] <= 8 && time1[1] >= 0 && time1[1] <= 59) || (time1[0] == 9 && time1[1] >= 0 && time1[1] <= 45)) { // Intime morning 6:00 to 9:45

                let t = time1[0] + ":" + time1[1] + " to " + time2[0] + ":" + time2[1];
                setattendance(values => ({ ...values, "time": t }))

                if ((time2[0] == 18 && time2[1] >= 30) || (time2[0] == 19 && time2[1] <= 30)) {       //Outtime condition 1 (normal time)

                    let p = 1;
                    let d = 0;
                    let o = 0;
                    let u = 0;

                    let tot = parseFloat(p) + parseFloat((o / 32)) - parseFloat((d / 18)) - parseFloat((u / 18));

                    setattendance(values => ({ ...values, "attendance": tot }))

                }

                if ((time2[0] == 19 && time2[1] >= 31) || (time2[0] >= 20 && time2[1] >= 0 && time2[1] <= 59))  //Outtime condition 2 (overtime)
                {

                    let extra = extraworkinghours();
                    let extraminutes = extra[0] * 60 + extra[1];
                    let a = (extraminutes / 15).toFixed(1);

                    let p = 1;
                    let d = 0;
                    let o = a;
                    let u = 0;

                    let tot = parseFloat(p) + parseFloat((o / 32)) - parseFloat((d / 18)) - parseFloat((u / 18));
                    console.log(tot)
                    setattendance(values => ({ ...values, "attendance": tot }))
                }

                if ((time2[0] <= 18 && time2[1] <= 29) || (time2[0] < 18 && time2[1] <= 59 && time2[1] >= 0))  //Outtime condition 3 (undertime)
                {

                    let under = underworkinghours();

                    let underminutes = under[0] * 60 + under[1];

                    let quot = parseInt((underminutes / 30));
                    let rema = (underminutes % 30);

                    let final;
                    if (rema > 0 && rema <= 29) {
                        final = quot + 1;
                    }
                    else {
                        final = quot;
                    }

                    let p = 1;
                    let d = 0;
                    let o = 0;
                    let u = final;

                    let tot = parseFloat(p) + parseFloat((o / 32)) - parseFloat((d / 18)) - parseFloat((u / 18));
                    setattendance(values => ({ ...values, "attendance": tot }))

                }
            }

            else if ((time1[0] == 9 && time1[1] > 45) || (time1[0] >= 10 && time1[1] >= 0 && time1[1] <= 59)) {      //If a person comes late after 9:45

                let under = delayedhours();

                let underminutes = under[0] * 60 + under[1];

                let quot = parseInt((underminutes / 30));
                let rema = (underminutes % 30);

                let final;
                if (rema > 0 && rema <= 29) {
                    final = quot + 1;
                }
                else {
                    final = quot;
                }

                let d = final;

                let t = time1[0] + ":" + time1[1] + " to " + time2[0] + ":" + time2[1];
                setattendance(values => ({ ...values, "time": t }))




                if ((time2[0] == 18 && time2[1] >= 30) || (time2[0] == 19 && time2[1] <= 30))   //Outtime condition 1 (normal time)
                {

                    let p = 1;
                    let o = 0;
                    let u = 0;

                    let tot = parseFloat(p) + parseFloat((o / 32)) - parseFloat((d / 18)) - parseFloat((u / 18));
                    setattendance(values => ({ ...values, "attendance": tot }))
                }

                if ((time2[0] == 19 && time2[1] >= 30) || (time2[0] >= 20 && time2[1] >= 0 && time2[1] <= 59))  //Outtime condition 2 (overtime)
                {
                    let extra = extraworkinghours();
                    let extraminutes = extra[0] * 60 + extra[1];
                    let a = (extraminutes / 15).toFixed(1);

                    let p = 1;
                    let o = a;
                    let u = 0;

                    let tot = parseFloat(p) + parseFloat((o / 32)) - parseFloat((d / 18)) - parseFloat((u / 18));
                    setattendance(values => ({ ...values, "attendance": tot }))
                }


                if ((time2[0] <= 18 && time2[1] <= 29) || (time2[0] < 18 && time2[1] <= 59 && time2[1] >= 0))  //Outtime condition 3 (undertime)
                {

                    let under = underworkinghours();

                    let underminutes = under[0] * 60 + under[1];

                    let quot = parseInt((underminutes / 30));
                    let rema = (underminutes % 30);

                    let final;
                    if (rema > 0 && rema <= 29) {
                        final = quot + 1;
                    }
                    else {
                        final = quot;
                    }

                    let p = 1;
                    let o = 0;
                    let u = final;

                    let tot = parseFloat(p) + parseFloat((o / 32)) - parseFloat((d / 18)) - parseFloat((u / 18));
                    setattendance(values => ({ ...values, "attendance": tot }))

                }
            }

        }
    }, [time1, time2]);

    useEffect(() => {
        getpendingsites();
    }, []);


    return (

        <>
            {
                loading
                    ? <Loader />
                    : <></>
            }

            {
                modal
                    ? <Modal />
                    : <></>
            }

            <div className='min-h-screen relative flex flex-col items-center mx-2 border-gray-200 rounded-md z-0 pt-20 pb-[24px] bg-gray-50'>
                <h2 className='my-2 text-center text-2xl lg:text-3xl  underline text-fix'>New Attendance:</h2>

                <div className='relative flex items-center justify-center h-auto m-2 rounded-md w-full sm:container bg-gray-50'>
                    <div className='relative z-10 h-auto px-4 py-5 rounded-lg shadow w-full sm:w-3/4 lg:w-3/5 border border-slate-300' >
                        <h1 className='text-2xl mb-3 text-gray-900 underline underline-offset-4 w-full text-fix'>Select ER Number:</h1>

                        <form onSubmit={submitform} className='flex items-center w-full flex-wrap mb-3'>
                            <p className='text-lg'>ER No.:</p>
                            <input onChange={handleer} onWheel={e => e.target.blur()} className='pl-1 mr-3 py-1 text-base border' type='text' required />
                            <button className="rounded-sm ani-button my-2">Search</button>
                        </form>

                        {
                            data.length > 0
                                ? <div className=''>

                                    <span className='block border mb-3'></span>

                                    <h1 className='text-2xl mb-2 text-gray-900 underline underline-offset-4 w-full text-fix'>Worker Details:</h1>

                                    <div className='flex flex-col w-full mb-3'>

                                        <div className='flex flex-wrap my-0.5'>
                                            <p className='text-lg text-fix underline underline-offset-2'>ER No.:</p>
                                            <p className='text-lg'>{data[0].er_no}</p>
                                        </div>

                                        <div className='flex flex-wrap my-0.5'>
                                            <p className='text-lg text-fix underline underline-offset-2'>Name:</p>
                                            <p className='text-lg'>{data[0].name} </p>

                                        </div>

                                        <div className='flex flex-wrap my-0.5'>
                                            <p className='text-lg text-fix underline underline-offset-2'>Aadhar No.:</p>
                                            <p className='text-lg'>{data[0].aadhar}</p>
                                        </div>

                                        <div className='flex flex-wrap my-0.5'>
                                            <p className='text-lg text-fix underline underline-offset-2'>Contact No.:</p>
                                            <p className='text-lg'>+91 {data[0].contact}</p>
                                        </div>

                                        <form onSubmit={submitattendance}>

                                            <div className='flex items-center flex-wrap my-2'>
                                                <p className='text-lg text-fix mr-2'>Date:</p>
                                                <input onChange={handlechange} onWheel={e => e.target.blur()} name="date" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="date" required />
                                            </div>

                                            {
                                                data[0].designation == "Office Staff"
                                                    ?
                                                    <>
                                                        <div className='flex items-center flex-wrap my-2'>
                                                            <p className='text-lg text-fix mr-2'>In Time:</p>
                                                            <input onChange={handlechangetime} name="time1" className='w-full sm:w-72 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="time" placeholder='Time' required />
                                                        </div>
                                                        <div className='flex items-center flex-wrap my-2'>
                                                            <p className='text-lg text-fix mr-2'>Out Time:</p>
                                                            <input onChange={handlechangetime} name="time2" className='w-full sm:w-72 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="time" placeholder='Time' required />
                                                        </div>
                                                    </>
                                                    : <div className='flex items-center flex-wrap my-2'>
                                                        <p className='text-lg text-fix mr-2'>Present:</p>
                                                        <select onChange={handlechange} name="attendance" className="h-9 w-32 text-base border rounded border-slate-300" required>
                                                            <option selected className=''>Select..</option>
                                                            <option>0</option>
                                                            <option>0.25</option>
                                                            <option>0.5</option>
                                                            <option>0.75</option>
                                                            <option>1</option>
                                                            <option>1.25</option>
                                                            <option>1.5</option>
                                                            <option>1.75</option>
                                                            <option>2</option>
                                                            <option>2.25</option>
                                                            <option>2.5</option>
                                                            <option>2.75</option>
                                                            <option>3</option>
                                                        </select>
                                                    </div>

                                            }

                                            <div className='flex items-center flex-wrap my-2'>
                                                <p className='text-lg text-fix mr-2'>Site Code:</p>
                                                <select onChange={handlechange} name="site_code" className="h-9 w-32 text-base border rounded border-slate-300" required>
                                                    <option selected className=''>Select..</option>
                                                    {
                                                        sites.map((val) =>
                                                            <option value={val.site_code}>{val.site_code}-{val.site_name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>

                                            {
                                                data[0].designation != "Office Staff"
                                                    ? <div className='flex items-center flex-wrap my-2'>
                                                        <p className='text-lg text-fix mr-2'>Time:</p>
                                                        <input onChange={handlechange} name="time" className='w-full sm:w-72 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Time' />
                                                    </div>
                                                    : <></>
                                            }



                                            <div className='flex items-center flex-wrap my-2'>
                                                <p className='text-lg text-fix mr-2'>Advance:</p>
                                                <input onChange={handlechange} onWheel={e => e.target.blur()} name="advance" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Advance' />
                                            </div>

                                            <div className='flex items-center flex-wrap my-2'>
                                                <p className='text-lg text-fix mr-2'>Food:</p>
                                                <input onChange={handlechange} onWheel={e => e.target.blur()} name="food" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Food' />
                                            </div>

                                            <div className='flex items-center flex-wrap my-2'>
                                                <p className='text-lg text-fix mr-2'>Travelling:</p>
                                                <input onChange={handlechange} onWheel={e => e.target.blur()} name="travelling" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Travelling' />
                                            </div>

                                            <div className='flex items-center flex-wrap my-2'>
                                                <p className='text-lg text-fix mr-2'>Remarks:</p>
                                                <input onChange={handlechange} name="remarks" className='w-full sm:w-72 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Remarks' />
                                            </div>

                                            <button className="rounded-sm ani-button w-fit">Add</button>
                                        </form>

                                    </div>

                                </div>
                                : <></>
                        }




                    </div>


                </div>
            </div >
        </>
    )
}

export default AttendanceAdmin