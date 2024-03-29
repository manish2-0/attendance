import React, { useState, useEffect } from 'react'
import useModal from '../hooks/useModal';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import Loader from './Loader';
import Modal from '../modals/Modal';

const EditCashLabour = () => {

    const [loading, setloading] = useState(false);
    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const api = useAxiosPrivate();

    const navigate = useNavigate();

    const [sites, setsites] = useState([]);

    const location = useLocation();
    const { values } = location.state;


    const [data, setdata] = useState({

        "date": moment(values.date).format("YYYY-MM-DD"),
        "name": values.name,
        "present": values.present,
        "site_code": values.site_code,
        "rate": values.rate,
        "food": values.food,
        "time": values.time,
        "remarks": values.remarks
    });


    const handlechange = (e) => {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

        if (value == "" || value == "Select..") {
            if (name == "food" || name == "rate") {
                setdata(values => ({ ...values, [name]: "0" }));
            }
            else {
                setdata(values => ({ ...values, [name]: "-" }));
            }
        }
        else {
            setdata(values => ({ ...values, [name]: value }))

        }

    }

    const submitform = async (e) => {
        e.preventDefault();
        setloading(true);

        if (data.present == "-" || data.present == "Select.." || data.site_code == "-" || data.site_code == "Select..") {
            setloading(false);
            setmodal(true);
            await setmodalmessage({
                "text1": "Error",
                "text2": "Please select attendance and site code."
            });
            return 0;
        }

        try {
            await api.put(`cash/cash-update/${values.sr_no}`, JSON.stringify(data)).then(async function (response) {
                // console.log(response)
                if (response.data.status == 1) {
                    setloading(false);
                    setmodal(true);
                    await setmodalmessage({
                        "text1": "Done",
                        "text2": "Entry edited succesfully."
                    });

                    navigate('/');

                }
                else {
                    setloading(false);
                    setmodal(true);
                    await setmodalmessage({
                        "text1": "Error",
                        "text2": "Error while adding entry."
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
                <h2 className='my-2 text-center text-2xl lg:text-3xl  underline text-fix'>Cash Labour Attendance</h2>

                <div className='relative flex items-center justify-center h-auto m-2 rounded-md w-full sm:container bg-gray-50'>
                    <div className='relative z-10 h-auto px-4 py-5 rounded-lg shadow w-full sm:w-3/4 lg:w-3/5 border border-slate-300' >

                        <div className=''>

                            <h1 className='text-2xl mb-2 text-gray-900 underline underline-offset-4 w-full text-fix'>Worker Details:</h1>

                            <div className='flex flex-col w-full mb-3'>



                                <form onSubmit={submitform}>

                                    <div className='flex items-center flex-wrap my-2'>
                                        <p className='text-lg text-fix mr-2'>Date:</p>
                                        {
                                            localStorage.getItem("role") == "Admin"
                                                ? <input defaultValue={data.date} onChange={handlechange} onWheel={e => e.target.blur()} name="date" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="date" required />
                                                : <input disabled defaultValue={data.date} onWheel={e => e.target.blur()} name="date" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="date" required />
                                        }
                                    </div>

                                    <div className='flex items-center flex-wrap my-2'>
                                        <p className='text-lg text-fix mr-2'>Name:</p>
                                        <input defaultValue={data.name} onChange={handlechange} name="name" className='w-full sm:w-72 lg:w-80 xl:w-96 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Name' required />
                                    </div>

                                    <div className='flex items-center flex-wrap my-2'>
                                        <p className='text-lg text-fix mr-2'>Present:</p>
                                        <select defaultValue={data.present} onChange={handlechange} name="present" className="h-9 w-32 text-base border rounded border-slate-300" required>
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
                                        <select defaultValue={data.site_code} onChange={handlechange} name="site_code" className="h-9 w-32 text-base border rounded border-slate-300" required>
                                            <option className=''>Select..</option>
                                            <option selected value={data.site_code}>{data.site_code}</option>
                                            {
                                                sites.map((val) =>
                                                    <option value={val.site_code}> {val.site_code}-{val.site_name} </option>
                                                )
                                            }
                                        </select>
                                    </div>




                                    <div className='flex items-center flex-wrap my-2'>
                                        <p className='text-lg text-fix mr-2'>Rate:</p>
                                        <input defaultValue={data.rate} onChange={handlechange} onWheel={e => e.target.blur()} name="rate" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Rate' required />
                                    </div>

                                    <div className='flex items-center flex-wrap my-2'>
                                        <p className='text-lg text-fix mr-2'>Food and Travelling:</p>
                                        <input defaultValue={data.food} onChange={handlechange} onWheel={e => e.target.blur()} name="food" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Food and Travel' />
                                    </div>

                                    <div className='flex items-center flex-wrap my-2'>
                                        <p className='text-lg text-fix mr-2'>Time:</p>
                                        <input defaultValue={data.time} onChange={handlechange} name="time" className='w-full sm:w-72 lg:w-80 xl:w-96 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Time' />
                                    </div>

                                    <div className='flex items-center flex-wrap my-2'>
                                        <p className='text-lg text-fix mr-2'>Remarks:</p>
                                        <input defaultValue={data.remarks} onChange={handlechange} name="remarks" className='w-full sm:w-72 lg:w-80 xl:w-96 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Remarks' />
                                    </div>

                                    <button className="rounded-sm ani-button w-fit">Done</button>
                                </form>

                            </div>

                        </div>





                    </div>


                </div>
            </div>
        </>
    )
}

export default EditCashLabour