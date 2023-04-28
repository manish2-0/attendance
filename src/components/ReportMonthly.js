import React, { useEffect, useState } from 'react'
import moment from 'moment/moment';
import Loader from './Loader';
import Modal from '../modals/Modal';
import useModal from '../hooks/useModal';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const ReportMonthly = () => {

    const [loading, setloading] = useState(false);
    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const [data, setdata] = useState([]);
    const [temp, settemp] = useState([]);

    const api = useAxiosPrivate();

    const [inputs, setinputs] = useState({
        "from": "-",
        "to": "-"
    });


    const handlechange = async (e) => {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

        setinputs(inputs => ({ ...inputs, [name]: value }));


    }

    const submitform = async (e) => {
        e.preventDefault();
        setdata([]);
        settemp([]);
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
                    settemp(response.data.data)
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

        for (let i = 0; i < temp.length; i++) {

            let count = 0;
            let name = temp[i].name;
            let er_no = temp[i].er_no;
            let rate = temp[i].rate;

            let adv = 0;
            let food = 0;
            let travel = 0;
            let atte = 0.00;
            let bal = 0;
            let tot = 0;

            while ((i + count) < temp.length && temp[i].er_no == temp[i + count].er_no) {
                adv = adv + parseInt(temp[i + count].advance);
                food = food + parseInt(temp[i + count].food);
                travel = travel + parseInt(temp[i + count].travelling);
                atte = (parseFloat(atte) + parseFloat(temp[i + count].attendance)).toFixed(2);

                count++;
            }

            tot = rate * atte;
            tot = tot.toFixed();
            bal = tot - adv + food + travel;
            // console.log(tot);
            // console.log(bal)

            setdata(val => [...val, { "name": name, "er_no": er_no, "rate": rate, "atte": atte, "total": tot, "advance": adv, "food": food, "travelling": travel, "balance": bal }])

            i = i + count - 1;

        }

    }, [temp]);


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


            <div className='px-2 pt-20'>

                <div className=' md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1400px] mx-auto'>
                    <h1 className='text-2xl text-fix'>Generate Report</h1>

                    <div className='flex flex-wrap flex-row'>
                        <form onSubmit={submitform}>

                            <div className='flex flex-wrap flex-row mb-2'>

                                <div className='flex items-center flex-wrap pr-6'>
                                    <h1 className='text-fix text-lg w-fit pr-1'>From:</h1>
                                    <input onChange={handlechange} type='date' name='from' className='border rounded border-slate-300' />
                                </div>

                                <div className='flex  items-center flex-wrap'>
                                    <h1 className='text-fix text-lg w-fit pr-1'>To:</h1>
                                    <input onChange={handlechange} type='date' name='to' className='border rounded border-slate-300' />
                                </div>

                            </div>

                            <button class="bg-fix hover:bg-blue-800 text-white font-bold py-1 px-5 rounded mb-1 mt-1">
                                Get
                            </button>

                        </form>

                    </div>

                    <h1 className='text-lg text-slate-600'> <span className='underline underline-offset-2 text-fix'>Montly Attendance:</span> {inputs.month},{inputs.year}</h1>

                </div>

                <div className="relative overflow-x-auto scrollbar-hide">
                    <table className="container w-auto md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1400px] m-1 mx-auto text-left text-gray-500 border shadow">
                        <thead className="text-white border-b border-gray-300 bg-fix">
                            <tr className='text-sm '>
                                <th scope="col" className="text-center border px-2 whitespace-nowrap">
                                    No.
                                </th>
                                <th scope="col" className="text-center border px-1 whitespace-nowrap">
                                    ER No.
                                </th>
                                <th scope="col" className="text-center border px-6 whitespace-nowrap ">
                                    Name
                                </th>
                                <th scope="col" className="text-center border px-3 whitespace-nowrap ">
                                    Base Rate
                                </th>
                                <th scope="col" className="text-center border px-2 whitespace-nowrap ">
                                    Present
                                </th>
                                <th scope="col" className="text-center border px-2 whitespace-nowrap ">
                                    Total
                                </th>
                                <th scope="col" className="text-center border px-3 py-1 whitespace-nowrap">
                                    Advance
                                </th>
                                <th scope="col" className="text-center border px-2 py-1 whitespace-nowrap">
                                    Food
                                </th>
                                <th scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                                    Travelling
                                </th>
                                <th scope="col" className="text-center border px-3 py-1 whitespace-nowrap">
                                    Balance
                                </th>

                            </tr>
                        </thead>
                        <tbody className=''>

                            {
                                data.length == 0
                                    ? <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                        <td colSpan={10} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                            No data found
                                        </td>
                                    </tr>
                                    :


                                    data.map((ele, no) =>
                                        <tr className="bg-white border-b hover:bg-gray-50 text-[12px]">

                                            <th scope="row" className="text-center border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                {no + 1}
                                            </th>
                                            <td className="text-center border py-1">
                                                {ele.er_no}
                                            </td>
                                            <td className="text-center border px-2 py-1 whitespace-wrap">
                                                {ele.name}
                                            </td>
                                            <td className="text-center border px-2 py-1">
                                                {ele.rate}/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.atte}
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.total}/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.advance}/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.food}/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.travelling}/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.balance}/-
                                            </td>

                                        </tr>


                                    )


                            }




                        </tbody>
                    </table>
                </div>
            </div >

        </>
    )
}

export default ReportMonthly