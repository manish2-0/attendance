import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import useModal from '../hooks/useModal';
import Modal from '../modals/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';

const EditAttendance = () => {

    const [loading, setloading] = useState(false);
    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const api = useAxiosPrivate();

    const navigate = useNavigate();

    const [sites, setsites] = useState([]);

    const location = useLocation();
    const { values } = location.state;

    const [data, setdata] = useState(values);


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

    const handlechange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;

        // setdata(values => ({ ...values, "date": moment(values.date).format("YYYY-MM-DD") }));

        if (value == "Select.." || value == "") {
            if (name == "attendance" || name == "advance" || name == "food" || name == "travelling") {
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

    const handlesubmit = async (e) => {
        e.preventDefault();
        setloading(true);

        if (data.attendance == "-" || data.attendance == "Select.." || data.site_code == "-" || data.site_code == "Select..") {
            setloading(false);
            setmodal(true);
            await setmodalmessage({
                "text1": "Error",
                "text2": "Please select attendance and site code."
            });
            return 0;
        }

        try {
            await api.put(`attendance/attendance-update`, JSON.stringify(data)).then(async function (response) {
                // console.log(response)
                if (response.data.status == 1) {
                    setloading(false);
                    setmodal(true);
                    await setmodalmessage({
                        "text1": "Done",
                        "text2": "Attendance edited succesfully."
                    });

                    navigate('/');

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



    useEffect(() => {
        setdata(val => ({ ...val, date: moment(values.date).format("YYYY-MM-DD") }))
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
                <h2 className='my-2 text-center text-2xl lg:text-3xl  underline text-fix'>Edit Attendance:</h2>

                <div className='relative flex items-center justify-center h-auto m-2 rounded-md w-full sm:container bg-gray-50'>
                    <div className='relative z-10 h-auto px-4 py-5 rounded-lg shadow w-full sm:w-3/4 lg:w-3/5 border border-slate-300' >
                        <h1 className='text-2xl mb-2 text-gray-900 underline underline-offset-4 w-full text-fix'>Worker Details:</h1>

                        <div className='flex flex-col w-full mb-3'>

                            <div className='flex items-center flex-wrap my-1'>
                                <p className='text-lg text-fix mr-2'>ER No.:</p>
                                <p className='text-lg mr-2'>{data.er_no}</p>
                            </div>

                            <div className='flex items-center flex-wrap my-1'>
                                <p className='text-lg text-fix mr-2'>Date:</p>
                                <p className='text-lg mr-2'>{moment(data.date).format("DD-MM-YYYY")}</p>
                            </div>

                            <form onSubmit={handlesubmit}>


                                <div className='flex items-center flex-wrap my-2'>
                                    <p className='text-lg text-fix mr-2'>Present:</p>
                                    <select onChange={handlechange} defaultValue={data.attendance} name="attendance" className="h-9 w-32 text-base border rounded border-slate-300" required>
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
                                    <select defaultValue={data.site_code - data.site_name} onChange={handlechange} name="site_code" className="h-9 w-32 text-base border rounded border-slate-300" required>
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
                                    <p className='text-lg text-fix mr-2'>Time:</p>
                                    <input onChange={handlechange} defaultValue={data.time} name="time" className='w-full sm:w-72 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Time' />
                                </div>

                                <div className='flex items-center flex-wrap my-2'>
                                    <p className='text-lg text-fix mr-2'>Advance:</p>
                                    <input onChange={handlechange} defaultValue={data.advance} onWheel={e => e.target.blur()} name="advance" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Advance' />
                                </div>

                                <div className='flex items-center flex-wrap my-2'>
                                    <p className='text-lg text-fix mr-2'>Food:</p>
                                    <input onChange={handlechange} defaultValue={data.food} onWheel={e => e.target.blur()} name="food" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Food' />
                                </div>

                                <div className='flex items-center flex-wrap my-2'>
                                    <p className='text-lg text-fix mr-2'>Travelling:</p>
                                    <input onChange={handlechange} defaultValue={data.travelling} onWheel={e => e.target.blur()} name="travelling" className='w-40 sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Travelling' />
                                </div>

                                <div className='flex items-center flex-wrap my-2'>
                                    <p className='text-lg text-fix mr-2'>Remarks:</p>
                                    <input onChange={handlechange} defaultValue={data.remarks} name="remarks" className='w-full sm:w-72 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Remarks' />
                                </div>

                                <button className="rounded-sm ani-button w-fit">Done</button>
                            </form>

                        </div>




                    </div>


                </div>
            </div>

        </>
    )
}

export default EditAttendance