import React from 'react'
import Loader from './Loader'
import Modal from '../modals/Modal'
import useModal from '../hooks/useModal';
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import moment from 'moment';


const ReportCashLabour = () => {

    const numFor = Intl.NumberFormat('en-IN');

    const [loading, setloading] = useState(false);
    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const api = useAxiosPrivate();

    const [data, setdata] = useState([]);
    const [temp, settemp] = useState([]);

    const [sites, setsites] = useState([]);

    const [siteselected, setsiteselected] = useState({ "site": "" });

    const [inputs, setinputs] = useState({
        "from": "-",
        "to": "-"
    });

    const [tot, settot] = useState(0);

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

    const handlechange = async (e) => {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

        setinputs(inputs => ({ ...inputs, [name]: value }));


    }


    const handlesite = async (e) => {
        e.preventDefault();
        const value = e.target.value;

        if (value == "Show All") {
            setsiteselected({ "site": "" });
        }
        else {
            setsiteselected({ "site": value });
        }

        // console.log(value)

    }

    const submitform = async (e) => {
        e.preventDefault();
        setdata([]);
        setloading(true);

        if (inputs.from == "" || inputs.to == "") {
            setloading(false);
            setmodal(true);
            setmodalmessage({
                "text1": "Error",
                "text2": "Please select both dates."
            });

            return 0;
        }

        try {
            await api.post('cash/cash-report', JSON.stringify(inputs)).then(async function (response) {
                if (response?.data?.data) {
                    setdata(response.data.data)
                    setloading(false);
                    setmodal(true);
                    await setmodalmessage({
                        "text1": "Done",
                        "text2": "Report generated successfully."
                    });

                }
                else {
                    setloading(false);
                    setmodal(true);
                    setmodalmessage({
                        "text1": "Done",
                        "text2": "No labour Found."
                    });

                }

            });


        } catch (error) {
            setloading(false);
            setmodal(true);
            setmodalmessage({
                "text1": "Error Occured",
                "text2": "No labour response"
            });
        }
    }

    const printwindow = async (e) => {
        e.preventDefault();
        window.print();
    }


    const deletecash = async (f) => {

        setloading(true);

        try {
            await api.delete(`/cash/cash-delete/${f.sr_no}`).then(async function (response) {
                if (response.data.status == 1) {
                    setdata(data.filter((e) => {
                        return e !== f;
                    }));
                    setloading(false);
                }
                else {
                    setloading(false);
                }


            })

        } catch (error) {
            setloading(false);


        }

    }

    useEffect(() => {
        let tot = 0;

        data.filter((val) => {
            return siteselected.site == "" || siteselected.site == "Show All"
                ? val
                : val.site_code == siteselected.site
        }).map((ele) => {
            tot = parseInt(tot) + parseInt(((parseFloat(ele.present) * parseInt(ele.rate)) + parseInt(ele.food)).toFixed(0));
        })

        settot(numFor.format(tot));


    }, [data, siteselected]);

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


            <div id='extrabox1' className='px-2 pt-20'>

                <div className=' md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1400px] mx-auto'>
                    <h1 className='text-2xl text-fix underline underline-offset-2 mb-2'>Cash Labour Report</h1>

                    <div id='formhide1' className='flex flex-wrap flex-row'>
                        <form onSubmit={submitform}>

                            <div className='flex flex-wrap flex-row mb-2'>

                                <div className='flex items-center flex-wrap pr-6'>
                                    <h1 className='text-fix text-lg w-fit pr-1'>From:</h1>
                                    <input onChange={handlechange} name="from" type='date' className="h-9 text-base border rounded border-slate-300" required />

                                </div>

                                <div className='flex  items-center flex-wrap pr-6'>
                                    <h1 className='text-fix text-lg w-fit pr-1'>To:</h1>
                                    <input onChange={handlechange} name="to" type='date' className="h-9 text-base border rounded border-slate-300" required />

                                </div>

                                <div className='flex items-center flex-wrap'>
                                    <h1 className='text-fix text-lg w-fit pr-1'>Site Code:</h1>
                                    <select onChange={handlesite} name="site_code" className="h-9 w-32 text-base border rounded border-slate-300">
                                        <option selected className=''>Show All</option>
                                        {
                                            sites.map((val) =>
                                                <option value={val.site_code}>{val.site_code}-{val.site_name}</option>
                                            )
                                        }
                                    </select>
                                </div>


                            </div>

                            <button class="bg-fix hover:bg-blue-800 text-white font-bold py-1 px-5 rounded mb-1 mt-1 mr-2">
                                Get
                            </button>

                            <button onClick={printwindow} class="bg-fix hover:bg-blue-800 text-white font-bold py-1 px-5 rounded mb-1 mt-1">
                                Print
                            </button>

                        </form>

                    </div>

                    <h1 className='text-lg text-slate-600'> <span className='underline underline-offset-2 text-fix'>Attendance:</span> {moment(inputs.from).format("DD-MM-YYYY")} to {moment(inputs.to).format("DD-MM-YYYY")}</h1>

                </div>

                <div id='report1' className="relative overflow-x-auto scrollbar-hide">
                    <table className="container w-auto md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1400px] m-1 mx-auto text-left text-gray-500 border shadow">
                        <thead className="text-white border-b border-gray-300 bg-fix">
                            <tr className='text-sm '>
                                <th scope="col" className="text-center border px-2 whitespace-nowrap">
                                    No.
                                </th>
                                <th scope="col" className="text-center border px-1 whitespace-nowrap ">
                                    Date
                                </th>
                                <th scope="col" className="text-center border px-6 whitespace-nowrap ">
                                    Name
                                </th>
                                <th scope="col" className="text-center border px-1 whitespace-nowrap ">
                                    Site Code
                                </th>
                                <th scope="col" className="text-center border px-1 whitespace-nowrap ">
                                    Present
                                </th>
                                <th scope="col" className="text-center border px-1 whitespace-nowrap ">
                                    Base Rate
                                </th>
                                <th scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                                    Food and Travelling
                                </th>
                                <th scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                                    Total
                                </th>
                                <th scope="col" className="text-center border px-2 py-1 whitespace-nowrap">
                                    Time
                                </th>
                                <th scope="col" className="text-center border px-2 py-1 whitespace-nowrap">
                                    Remarks
                                </th>
                                <th scope="col" className="text-center border px-3 py-1 whitespace-nowrap">
                                    Marked By
                                </th>
                                <th id='hideedit' scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                                    Edit
                                </th>

                                <th scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                                    Delete
                                </th>

                            </tr>
                        </thead>
                        <tbody className=''>

                            {
                                data.length == 0
                                    ? <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                        <td colSpan={13} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                            No data found
                                        </td>
                                    </tr>
                                    :

                                    data.filter((val) => {
                                        return siteselected.site == ""
                                            ? val
                                            : val.site_code == siteselected.site
                                    }).map((ele, index) =>
                                        <tr className="bg-white border-b hover:bg-gray-50 text-[12px]">

                                            <th scope="row" className="text-center border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                {index + 1}
                                            </th>
                                            <td className="text-center border px-2 py-1 whitespace-wrap">
                                                {moment(ele.date).format("DD-MM-YYYY")}
                                            </td>
                                            <td className="text-center border px-2 py-1 whitespace-wrap">
                                                {ele.name}
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.site_code}
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.present}
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.rate}/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.food}/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {((parseFloat(ele.present) * parseInt(ele.rate)) + parseInt(ele.food)).toFixed(0)}/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.time}
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.remarks}
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.marked_by}
                                            </td>
                                            <td id='hideedit1' className="text-center border px-1 py-1">
                                                <Link state={{ values: ele }} to="/editcash" className="font-medium text-fix hover:underline">Edit</Link>
                                            </td>
                                            <td className="text-center text-red-600 border px-3 py-1 whitespace-nowrap hover:underline underline-offset-2 cursor-pointer ">
                                                {
                                                    localStorage.getItem("role") == "Admin" && localStorage.getItem('admin_id') == "manish"
                                                        ? <button onClick={() => { deletecash(ele) }}>Delete</button>
                                                        : "Cant Delete"
                                                }

                                            </td>

                                        </tr>)
                            }


                            {
                                data.length != 0
                                    ? <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                        <td colSpan={13} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                            <span className='text-fix'>Total Expenses:</span> {tot}/-
                                        </td>
                                    </tr>
                                    : <></>

                            }


                        </tbody>
                    </table>
                </div>
            </div >

        </>
    )
}

export default ReportCashLabour