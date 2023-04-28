import React, { useState } from 'react'
import Loader from './Loader';
import Modal from '../modals/Modal';
import useModal from '../hooks/useModal';
import moment from 'moment';

const ViewDailyAttendance = () => {

    const [date, setdate] = useState("");

    const [loading, setloading] = useState(false);
    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const handlechange = (e) => {
        e.preventDefault();
        if (e.target.value == "") {
            setdate("");
        }
        else {
            setdate(e.target.value);
        }

    }

    const submitform = async (e) => {
        e.preventDefault();
        setloading(true);
        if (date == "") {
            setloading(false);
            setmodal(true);
            await setmodalmessage({
                "text1": "Error",
                "text2": "Please select date."
            });
            return 0;
        }
        setloading(false);

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


            <div className='min-h-screen relative flex flex-col items-center mx-2 border-gray-200 rounded-md z-0 pt-20 pb-[24px] bg-gray-50'>


                <div className='relative flex items-center justify-center h-auto m-2 rounded-md w-full sm:container bg-gray-50'>
                    <div className='relative z-10 h-auto px-4 py-5 rounded-lg shadow w-full sm:w-3/4 lg:w-3/5 border border-slate-300' >

                        <h2 className='my-2 text-center text-xl sm:text-2xl lg:text-3xl  underline text-fix'>Daily Attendance</h2>

                        <form onSubmit={submitform} className='flex items-center w-full flex-wrap mb-3'>
                            <p className='text-lg'>Select Date:</p>
                            <input onChange={handlechange} onWheel={e => e.target.blur()} className='pl-1 ml-2 mr-3 py-1 text-base border' type='date' required />
                            <button className="rounded-sm ani-button my-2">Search</button>
                        </form>

                        <>
                            {
                                date == ""
                                    ? <p className='text-fix'>Please select date.</p>
                                    : <p className='text-fix'>Attendance for: {moment(date).format("DD/MM/YYYY")}</p>
                            }


                            <div className="relative overflow-x-auto scrollbar-hide">


                                <table className="container w-auto md:w-full m-1 mx-auto text-xs lg:text-sm text-left text-gray-500 border shadow">
                                    <thead className="text-white uppercase border-b border-gray-300 bg-fix">
                                        <tr className=''>
                                            <th scope="col" className="text-center border px-1 whitespace-nowrap">
                                                No.
                                            </th>

                                            <th scope="col" className="text-center border px-1 whitespace-nowrap ">
                                                ER No.
                                            </th>
                                            <th scope="col" className="text-center border px-12 whitespace-nowrap ">
                                                Name
                                            </th>
                                            <th scope="col" className="text-center border px-1 whitespace-nowrap ">
                                                Site Code
                                            </th>
                                            <th scope="col" className="text-center border px-2 py-2 whitespace-nowrap">
                                                Present
                                            </th>
                                            <th scope="col" className="text-center border px-2 py-2 whitespace-nowrap">
                                                Food
                                            </th>
                                            <th scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                                                Travel
                                            </th>
                                            <th scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                                                Advance
                                            </th>
                                            <th scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                                                Remarks
                                            </th>
                                            <th scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                                                Time
                                            </th>



                                        </tr>
                                    </thead>
                                    <tbody className=''>


                                        <tr className="bg-white border-b hover:bg-gray-50 text-[10px] lg:text-sm">

                                            <th scope="row" className="text-center border py-1 font-medium text-fix ">
                                                1
                                            </th>
                                            <td className="text-center border py-1 px-1 whitespace-nowrap">
                                                ER9999
                                            </td>
                                            <td className="text-center border px-1 py-1 whitespace-wrap">
                                                Manish Narendra Kumavat
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                999
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                3.5
                                            </td>

                                            <td className="text-center border px-1 py-1">
                                                1000
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                1000/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                1000/-
                                            </td>
                                            <td className="text-center border px-2 py-1 whitespace-nowrap">
                                                Expmpale of work done
                                            </td>
                                            <td className="text-center border px-2 py-1 whitespace-nowrap">
                                                Manish
                                            </td>


                                        </tr>

                                        <tr className="bg-white border-b hover:bg-gray-50 text-[10px] lg:text-sm">

                                            <th scope="row" className="text-center border py-1 font-medium text-fix ">
                                                1
                                            </th>
                                            <td className="text-center border py-1 px-1 whitespace-nowrap">
                                                ER9999
                                            </td>
                                            <td className="text-center border px-1 py-1 whitespace-wrap">
                                                Manish Narendra Kumavat Manish 
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                999
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                3.5
                                            </td>

                                            <td className="text-center border px-1 py-1">
                                                1000
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                1000/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                1000/-
                                            </td>
                                            <td className="text-center border px-2 py-1 whitespace-nowrap">
                                                Expmpale of work done
                                            </td>
                                            <td className="text-center border px-2 py-1 whitespace-nowrap">
                                                Manish
                                            </td>


                                        </tr>


                                    </tbody>
                                </table>
                            </div>

                        </>




                    </div>


                </div>
            </div>

        </>
    )
}

export default ViewDailyAttendance