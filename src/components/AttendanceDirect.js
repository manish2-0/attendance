import React, { useState, useEffect } from 'react'
import useModal from '../hooks/useModal';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Modal from '../modals/Modal';
import moment from 'moment';

const AttendanceDirect = () => {

    const [loading, setloading] = useState(false);
    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const location = useLocation();
    const { values } = location.state;

    const api = useAxiosPrivate();

    const navigate = useNavigate();

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



    const [sites, setsites] = useState([]);

    const [data, setdata] = useState([]);


    const handlechange = (e) => {
        e.preventDefault();

        setattendance(val => ({ ...val, "er_no": values.er_no }))

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
        // console.log(values)
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

                        <h1 className='text-2xl mb-2 text-gray-900 underline underline-offset-4 w-full text-fix'>Worker Details:</h1>

                        <div className='flex flex-col w-full mb-3'>

                            <div className='flex flex-wrap my-0.5'>
                                <p className='text-lg text-fix underline underline-offset-2'>ER No.:</p>
                                <p className='text-lg'>{values.er_no}</p>
                            </div>

                            <div className='flex flex-wrap my-0.5'>
                                <p className='text-lg text-fix underline underline-offset-2'>Name:</p>
                                <p className='text-lg'>{values.name} </p>

                            </div>

                            <div className='flex flex-wrap my-0.5'>
                                <p className='text-lg text-fix underline underline-offset-2'>Aadhar No.:</p>
                                <p className='text-lg'>{values.aadhar}</p>
                            </div>

                            <div className='flex flex-wrap my-0.5'>
                                <p className='text-lg text-fix underline underline-offset-2'>Contact No.:</p>
                                <p className='text-lg'>+91 {values.contact}</p>
                            </div>

                            <form onSubmit={ submitattendance}>

                                <div className='flex items-center flex-wrap my-2'>
                                    <p className='text-lg text-fix mr-2'>Date:</p>
                                    <input onChange={handlechange} max={moment().format("YYYY-MM-DD")} onWheel={e => e.target.blur()} name="date" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="date" required />
                                </div>

                                <div className='flex items-center flex-wrap my-2'>
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

                                <div className='flex items-center flex-wrap my-2'>
                                    <p className='text-lg text-fix mr-2'>Time:</p>
                                    <input onChange={handlechange} name="time" className='w-full sm:w-72 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Time' />
                                </div>

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
                </div>

            </div>

        </>
    )
}

export default AttendanceDirect