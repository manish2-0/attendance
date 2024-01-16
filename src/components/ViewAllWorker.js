import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import useModal from '../hooks/useModal';
import Modal from '../modals/Modal';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const ViewAllWorker = () => {

    const [loading, setloading] = useState(false);

    const [search, setsearch] = useState({ "er": "", "name": "" });

    const handlechange = (e) => {
        e.preventDefault();
        setsearch(val => ({ ...val, [e.target.name]: e.target.value }));
    }

    const api = useAxiosPrivate();

    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const [data, setdata] = useState([]);

    const getall = async () => {
        setloading(true);
        try {
            await api.get('employee/employee-get-all').then(response => {
                if (response?.data?.data) {
                    setdata(response.data.data)
                    setloading(false);
                }
                else {
                    setloading(false);
                    setmodal(true)
                    setmodalmessage({
                        "text1": "Error",
                        "text2": "No data found."
                    });
                }
            })

        } catch (error) {
            setloading(false);
            setmodal(true)
            setmodalmessage({
                "text1": "Error",
                "text2": "Could not fetch data please refresh page."
            });

        }
    }

    useEffect(() => {
        getall();
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

            <div className='p-2 pt-20'>

                <h2 className='my-2 text-center text-xl sm:text-2xl lg:text-3xl  underline text-fix'>All Workers:</h2>


                <p className='w-full md:w-[700px] xl:w-[1000px] mx-auto underline underline-offset-2 text-fix text-xl'>Search:</p>

                <div className='flex w-full md:w-[700px] xl:w-[1000px] sm:mx-auto'>

                    <div className='max-w-1/2 flex items-center flex-wrap m-1'>
                        <label>Er No.:</label>
                        <input onChange={handlechange} name='er' className=' w-28 border border-slate-500 rounded mx-1 px-1 py-1' type="text" />
                    </div>

                    <div className='max-w-1/2 flex items-center flex-wrap m-1'>
                        <label>Name:</label>
                        <input onChange={handlechange} name='name' className='w-36 border border-slate-500 rounded mx-1 px-1 py-1' type="text" />
                    </div>
                </div>

                <div className="relative overflow-x-auto scrollbar-hide">
                    <table className="container w-auto md:w-[700px] xl:w-[1000px] m-1 mx-auto text-sm text-left text-gray-500 border shadow">
                        <thead className="text-white uppercase border-b border-gray-300 bg-fix">
                            <tr className='text-[16px] '>
                                <th scope="col" className="text-center border px-6 whitespace-nowrap">
                                    No.
                                </th>
                                <th scope="col" className="text-center border px-8 whitespace-nowrap">
                                    ER No.
                                </th>
                                <th scope="col" className="text-center border px-12 whitespace-nowrap ">
                                    Name
                                </th>
                                <th scope="col" className="text-center border px-6 whitespace-nowrap ">
                                    Aadhar No.
                                </th>
                                <th scope="col" className="text-center border px-6 py-3 whitespace-nowrap">
                                    View
                                </th>

                                {
                                    localStorage.getItem("role") == "Admin"
                                        ? <th scope="col" className="text-center border px-1 py-3 whitespace-nowrap">
                                            Attendance
                                        </th>
                                        : <></>
                                }



                                {
                                    localStorage.getItem("role") == "Admin"
                                        ? <th scope="col" className="text-center border px-6 py-3 whitespace-nowrap">
                                            Edit
                                        </th>
                                        : <></>
                                }

                            </tr>
                        </thead>
                        <tbody className=''>

                            {
                                data.length == 0
                                    ? <tr className="bg-white border-b hover:bg-gray-50">
                                        <th colSpan={6} scope="row" className="text-left sm:text-center text-lg border py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            No data found
                                        </th>
                                    </tr>
                                    : data.filter((user) => {
                                        return search.name.toLowerCase() === ""
                                            ? user
                                            : user.name.toLowerCase().includes(search.name.toLowerCase());
                                    }).filter((user) => {
                                        return search.er.toLowerCase() === ""
                                            ? user
                                            : user.er_no.toLowerCase().includes(search.er.toLowerCase());
                                    }).map((ele, index) =>
                                        <tr className="bg-white border-b hover:bg-gray-50">

                                            <th scope="row" className="text-center border py-2 font-medium text-gray-900 whitespace-nowrap ">
                                                {index + 1}
                                            </th>
                                            <td className="text-center border py-2">
                                                {ele.er_no}
                                            </td>
                                            <td className="text-center border px-2 py-2 whitespace-nowrap">
                                                {ele.name}
                                            </td>
                                            <td className="text-center border px-5 py-2">
                                                {ele.aadhar}
                                            </td>
                                            <td className="text-center border px-4 py-2 text-fix hover:underline underline-offset-2">
                                                <Link state={{ values: ele }} to="viewworker" className="font-medium text-fix hover:underline">View</Link>
                                            </td>

                                            {
                                                localStorage.getItem("role") == "Admin"
                                                    ? <td className="text-center border px-1 py-2 text-fix hover:underline underline-offset-2">
                                                        <Link state={{ values: ele }} to="/directattendance" className="font-medium hover:underline">Add</Link>
                                                    </td>
                                                    : <></>
                                            }

                                            {
                                                localStorage.getItem("role") == "Admin"
                                                    ? <td className="text-center border px-4 py-2 text-fix hover:underline underline-offset-2">
                                                        <Link state={{ values: ele }} to="editworker" className="font-medium text-fix hover:underline">Edit</Link>
                                                    </td>
                                                    : <></>
                                            }


                                        </tr>

                                    )
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default ViewAllWorker