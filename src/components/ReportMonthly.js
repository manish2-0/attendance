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

    const [totalbalance, settotalbalance] = useState(0);
    const [totalactual, settotalactual] = useState(0);
    const [totalfood, settotalfood] = useState(0);
    const [totaltravelling, settotaltravelling] = useState(0);
    const [totaladvance, settotaladvance] = useState(0);

    const [pf, setpf] = useState(0);
    const [esic, setesic] = useState(0);
    const [pt, setpt] = useState(0);




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

    const printwindow = async (e) => {
        e.preventDefault();
        window.print();
    }

    useEffect(() => {

        let tmpactual = 0;
        let tmpfood = 0;
        let tmptravelling = 0;
        let tmpbalance = 0;
        let tmpadvance = 0;

        let tmppf = 0;
        let tmpesic = 0;
        let tmppt = 0;


        for (let i = 0; i < temp.length; i++) {

            let count = 0;
            let name = temp[i].name;
            let er_no = temp[i].er_no;
            let rate = temp[i].rate;

            let datapf = temp[i].pf;
            let dataesic = temp[i].esic;
            let datapt = temp[i].pt;

            let adv = 0;
            let food = 0;
            let travel = 0;
            let atte = 0.00;
            let bal = 0;
            let tot = 0;

            // let bs=0;

            while ((i + count) < temp.length && temp[i].er_no == temp[i + count].er_no) {
                adv = adv + parseInt(temp[i + count].advance);
                food = food + parseInt(temp[i + count].food);
                travel = travel + parseInt(temp[i + count].travelling);
                atte = (parseFloat(atte) + parseFloat(temp[i + count].attendance)).toFixed(6);

                count++;
            }

            tot = rate * atte;
            tot = tot.toFixed();

            // console.log(tot);
            // console.log(bal);

            let actualtotal = 0;
            actualtotal = parseInt(tot) + parseInt(food) + parseInt(travel);

            // For PF
            let perc = 0;

            if (datapf == "Yes") {
                perc = 0.12 * parseInt(actualtotal);
                perc = perc.toFixed(0);
                if (perc >= 1800) {
                    perc = 1800;
                    // setpf(1800);
                }
            }
            else {
                perc = 0;
            }


            // For ESIC
            let es = 0;
            if (dataesic == "Yes") {
                if (rate <= 700) {
                    es = 0.0075 * parseInt(actualtotal);
                    es = es.toFixed(0);

                }
            }
            else {
                es = 0;
            }


            // For PT 
            let p = 0;
            if (datapt == "Yes") {
                if (actualtotal > 7500 && actualtotal <= 10000) {
                    p = 175;
                }
                else if (actualtotal > 10000) {
                    p = 200;
                }
                else {
                    p = 0;
                }
            }
            else {
                p = 0;
            }


            setdata(val => [...val, { "name": name, "er_no": er_no, "rate": rate, "atte": atte, "total": tot, "advance": adv, "food": food, "travelling": travel, "pf": perc, "esic": es, "pt": p, "balance": bal }])

            bal = actualtotal - adv - perc - p - es;


            tmpactual = tmpactual + parseInt(tot);
            tmpfood = tmpfood + parseInt(food);
            tmptravelling = tmptravelling + parseInt(travel);
            tmpadvance = tmpadvance + parseInt(adv);
            tmpbalance = tmpbalance + parseInt(bal);

            tmppf = tmppf + parseInt(perc);
            tmppt = tmppt + parseInt(p);
            tmpesic = tmpesic + parseInt(es);

            i = i + count - 1;

        }

        settotalactual(tmpactual);
        settotalfood(tmpfood);
        settotaltravelling(tmptravelling);
        settotaladvance(tmpadvance);
        settotalbalance(tmpbalance);

        setesic(tmpesic);
        setpf(tmppf);
        setpt(tmppt);



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


            <div id='extrabox' className='px-2 pt-20'>

                <div className=' md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1400px] mx-auto'>
                    <h1 className='text-2xl text-fix'>Generate Report</h1>

                    <div id='formhide' className='flex flex-wrap flex-row'>
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

                <div id='report' className="relative overflow-x-auto scrollbar-hide">
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
                                <th scope="col" className="text-center border px-2 py-1 whitespace-nowrap">
                                    PF
                                </th>
                                <th scope="col" className="text-center border px-2 py-1 whitespace-nowrap">
                                    ESIC
                                </th>
                                <th scope="col" className="text-center border px-2 py-1 whitespace-nowrap">
                                    PT
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
                                                {parseFloat(ele.atte).toFixed(3)}
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
                                                {ele.pf}/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.esic}/-
                                            </td>
                                            <td className="text-center border px-1 py-1">
                                                {ele.pt}/-
                                            </td>

                                            <td className="text-center border px-1 py-1">
                                                {ele.balance}/-
                                            </td>

                                        </tr>


                                    )

                            }

                            {
                                data.length != 0
                                    ? <>
                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={13} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total Actual Amount:</span> {totalactual}/-
                                            </td>
                                        </tr>

                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={13} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total Advance Amount:</span> {totaladvance}/-
                                            </td>
                                        </tr>


                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={13} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total Food Amount:</span> {totalfood}/-
                                            </td>
                                        </tr>

                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={13} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total Travelling Amount:</span> {totaltravelling}/-
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={13} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total PF Amount:</span> {pf}/-
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={13} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total ESIC Amount:</span> {esic}/-
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={13} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total PT Amount:</span> {pt}/-
                                            </td>
                                        </tr>


                                        <tr className="bg-white border-b hover:bg-gray-50 text-base">
                                            <td colSpan={13} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                                                <span className='text-fix'>Total Balance Amount:</span> {totalbalance}/-
                                            </td>
                                        </tr>

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

export default ReportMonthly