import React, { useState } from 'react'
import Loader from './Loader';
import useModal from '../hooks/useModal';
import Modal from '../modals/Modal';
import useSearch from '../hooks/useSearch';
import { useLocation, Link } from 'react-router-dom';
import moment from 'moment';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const WorkerInformation = ({ user }) => {

    const [loading, setloading] = useState(false);
    const { data, setdata, attendance, setattendance } = useSearch();

    const api = useAxiosPrivate();

    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const handlechange = (e) => {
        e.preventDefault();

        setdata(data => ({ ...data, er_no: user.er_no }));

        const name = e.target.name;
        const value = e.target.value;

        if (value == "Select..") {
            setdata(data => ({ ...data, [name]: "-" }));
        }
        else {
            setdata(data => ({ ...data, [name]: value }));
        }

    }

    const submitform = async (e) => {
        e.preventDefault();
        setloading(true);

        try {
            await api.post('attendance/attendance-get', JSON.stringify(data)).then(async function (response) {
                // console.log(response)
                if (response?.data?.data) {
                    setloading(false);
                    setattendance(response.data.data);
                    setmodal(true);
                    await setmodalmessage({
                        "text1": "Success",
                        "text2": "Attendance Found."
                    });

                }
                else {
                    setattendance([]);
                    setloading(false);
                    setmodal(true);
                    setmodalmessage({
                        "text1": "Error",
                        "text2": "No attendance found."
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

            <div className='border p-2 mt-4 w-auto md:w-full'>

                <>

                    <p className='text-fix text-xl  md:text-2xl underline underline-offset-4 text-center font-medium my-2'>Information Card</p>

                    <div className='pl-2'>

                        <div className='flex items-center'>
                            <h1 className='text-fix pr-1'>ER No.: </h1>
                            <p >{user.er_no}</p>
                        </div>

                        <div className='flex'>
                            <h1 className='text-fix pr-1'>Name: </h1>
                            <p >{user.name}</p>
                        </div>

                        <div className='flex'>
                            <h1 className='text-fix pr-1'>Address:</h1>
                            <p >{user.address}</p>
                        </div>

                        <div className='flex'>
                            <h1 className='text-fix pr-1'>Contact:</h1>
                            <p >{user.contact}</p>
                        </div>

                        <div className='flex flex-wrap'>
                            <h1 className='text-fix  w-fit pr-1'>Date of Joining:</h1>
                            <p >{moment(user.doj).format("DD/MM/YYYY")}</p>
                        </div>

                        <div className='flex'>
                            <h1 className='text-fix pr-1'>Designation:</h1>
                            <p >{user.designation}</p>
                        </div>
                        <div className='flex'>
                            <h1 className='text-fix pr-1'>PF:</h1>
                            <p >{user.pf}</p>
                        </div>
                        <div className='flex'>
                            <h1 className='text-fix pr-1'>ESIC:</h1>
                            <p >{user.esic}</p>
                        </div>
                        <div className='flex'>
                            <h1 className='text-fix pr-1'>PT:</h1>
                            <p >{user.pt}</p>
                        </div>

                    </div>

                    {
                        localStorage.getItem("role") == "Admin"
                            ? <><p className='text-fix text-xl underline underline-offset-4 font-medium mt-2'>Daily Wage:</p>

                                <div className='pl-2'>

                                    <div className='flex flex-wrap'>
                                        <h1 className='text-fix  w-fit pr-1'>Amount:</h1>
                                        <p className='text-gray-600'>{user.rate}/-</p>
                                    </div>

                                    <Link state={{ values: user }} to="/viewextra" className="bg-fix hover:bg-blue-800 text-white font-medium py-1 px-5 rounded my-">
                                        More Information...
                                    </Link>

                                </div></>
                            : <></>
                    }

                    <p className='text-fix text-xl underline underline-offset-4 font-medium mt-2 mb-2'>Get Attendance:</p>

                    <form onSubmit={submitform}>

                        <div className='flex flex-row mb-2'>

                            <div className='flex items-center flex-wrap pr-6'>
                                <h1 className='text-fix text-lg w-fit pr-1'>Month:</h1>
                                <select onChange={handlechange} name="month" className="h-9  text-base border rounded border-slate-300" required>
                                    <option selected className=''>Select..</option>
                                    <option>January</option>
                                    <option>February</option>
                                    <option>March</option>
                                    <option>April</option>
                                    <option>May</option>
                                    <option>June</option>
                                    <option>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option>November</option>
                                    <option>December</option>
                                </select>
                            </div>

                            <div className='flex  items-center flex-wrap'>
                                <h1 className='text-fix text-lg w-fit pr-1'>Year:</h1>
                                <select onChange={handlechange} name="year" className="h-9 text-base border rounded border-slate-300" required>
                                    <option selected className=''>Select..</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                </select>
                            </div>

                        </div>

                        <button class="bg-fix hover:bg-blue-800 text-white font-bold py-1 px-5 rounded mb-2 mt-1">
                            Get
                        </button>


                    </form>

                </>

            </div>

        </>
    )
}

export default WorkerInformation