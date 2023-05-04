import React, { useEffect, useState } from 'react'
import moment from 'moment/moment';
import Loader from './Loader';
import Modal from '../modals/Modal';
import useModal from '../hooks/useModal';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const SiteReport = () => {

    const [loading, setloading] = useState(false);
    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const api = useAxiosPrivate();

    const [sites, setsites] = useState([]);

    const [data, setdata] = useState([]);

    const [food, setfood] = useState(0);
    const [travelling, settravelling] = useState(0);
    const [total, settotal] = useState(0);
    const [advance, setadvance] = useState(0);

    const [siteselected, setsiteselected] = useState({ "site": "" });

    const [inputs, setinputs] = useState({
        "from": "-",
        "to": "-"
    });


    const getpendingsites = () => {
        setloading(true);

        api.get(`site/site-get-pending`).then(function (response) {
            if (response?.data?.data) {
                setsites(response.data.data);
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
            await api.post('attendance/attendance-report', JSON.stringify(inputs)).then(async function (response) {
                if (response?.data?.data) {
                    setdata(response.data.data)
                    console.log(response.data.data)
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
                        "text2": "No attendance Found."
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


    useEffect(() => {

        let food1 = 0;
        let travelling1 = 0;
        let presenttotal1 = 0;
        let advance1 = 0;
        let grand1 = 0


        data.filter((val) => {
            return siteselected.site == "" || siteselected.site == "Show All"
                ? val
                : val.site_code == siteselected.site
        }).map((ele) => {
            food1 = parseInt(food1) + (parseInt(ele.food))
            travelling1 = parseInt(travelling1) + (parseInt(ele.travelling));
            advance1 = parseInt(advance1) + (parseInt(ele.advance));
            // travelling1 = parseInt(travelling1) + (parseInt(ele.travelling));
            presenttotal1 = parseFloat(presenttotal1.toFixed(2)) + (parseInt(ele.rate) * parseFloat(ele.attendance));
            console.log(presenttotal1)
        })

        setfood(food1);
        settravelling(travelling1);
        settotal(presenttotal1);
        setadvance(advance1);


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


            <div id='extrabox' className='px-2 pt-20'>

                <div className=' md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1400px] mx-auto'>
                    <h1 className='text-2xl text-fix'>Site Report</h1>

                    <div id='formhide' className='flex flex-wrap flex-row'>
                        <form onSubmit={submitform}>

                            <div className='flex flex-wrap flex-row mb-2'>

                                <div className='flex items-center flex-wrap pr-6'>
                                    <h1 className='text-fix text-lg w-fit pr-1'>From:</h1>
                                    <input onChange={handlechange} type='date' name='from' className='border rounded border-slate-300' />
                                </div>

                                <div className='flex  items-center flex-wrap pr-6'>
                                    <h1 className='text-fix text-lg w-fit pr-1'>To:</h1>
                                    <input onChange={handlechange} type='date' name='to' className='border rounded border-slate-300' />
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


                        </form>



                    </div>

                    <h1 className='text-lg text-slate-600'> <span className='underline underline-offset-2 text-fix'>Attendance:</span> {moment(inputs.from).format("DD-MM-YYYY")} to {moment(inputs.to).format("DD-MM-YYYY")}</h1>

                </div>

                <div id='report' className="relative overflow-x-auto scrollbar-hide">
                    <table className="container w-auto md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1400px] m-1 mx-auto text-left text-gray-500 border shadow">

                        <tbody className=''>

                            {
                                data.length != 0
                                    ? <>
                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={10} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total Actual Amount:</span> {total.toFixed(0)}/-
                                            </td>
                                        </tr>

                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={10} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total Advance Amount:</span> {advance}/-
                                            </td>
                                        </tr>


                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={10} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total Food Amount:</span> {food}/-
                                            </td>
                                        </tr>

                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={10} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total Travelling Amount:</span> {travelling}/-
                                            </td>
                                        </tr>


                                        {/* <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={10} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total Balance Amount:</span> {totalbalance}/-
                                            </td>
                                        </tr> */}

                                    </>
                                    : <></>
                            }



                        </tbody>
                    </table>
                </div>
            </div >

        </>
    )
}

export default SiteReport