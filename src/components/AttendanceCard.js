import React, { useState, useEffect } from 'react'
import WorkerInformation from './WorkerInformation';
import useSearch from '../hooks/useSearch';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

const AttendanceCard = ({ user }) => {

    const { data, setdata, attendance, setattendance } = useSearch();

    const [temp, settemp] = useState({
        "adv": 0,
        "food": 0,
        "travel": 0,
        "atte": 0
    });

    useEffect(() => {
        let adv = 0;
        let food = 0;
        let travel = 0;
        let atte = 0.00;
        let bal = 0;
        let actualtotal = 0;

        let pf = 0;
        let pt = 0;
        let esic = 0;

        for (let i = 0; i < attendance.length; i++) {
            adv = adv + parseInt(attendance[i].advance);
            food = food + parseInt(attendance[i].food);
            travel = travel + parseInt(attendance[i].travelling);
            atte = (parseFloat(atte) + parseFloat(attendance[i].attendance)).toFixed(6);
        }

        let tot = 0;
        tot = user.rate * atte;
        tot = tot.toFixed();

        actualtotal = parseInt(tot) + parseInt(food) + parseInt(travel);

        // For PF
        let perc = 0.12 * parseInt(actualtotal);
        perc = perc.toFixed(0);
        if (perc >= 1800) {
            pf = 1800;
            // setpf(1800);
        }
        else {
            pf = perc;
        }

        // For ESIC
        if (user.rate <= 700) {
            esic = 0.0075 * parseInt(actualtotal);
            esic = esic.toFixed(0);
        }

        // For PT 
        if (actualtotal > 7500 && actualtotal <= 10000) {
            pt = 175;

        }
        else if (actualtotal > 10000) {
            pt = 200;

        }
        else {
            pt = 0;

        }


        bal = parseFloat(parseInt(actualtotal) - adv - pf - esic - pt).toFixed(0);

        settemp({ "adv": adv, "food": food, "travel": travel, "atte": atte, "bal": bal, "actual": actualtotal, "pf": pf, "esic": esic, "pt": pt });
    }, [attendance]);


    return (
        <>
            <span className='w-full block border mb-2'></span>

            <p className='text-fix'>Attendance for: {data.month},{data.year}</p>

            <div className="relative overflow-x-auto scrollbar-hide">


                <table className="container w-auto md:w-full m-1 mx-auto text-xs lg:text-sm text-left text-gray-500 border shadow">
                    <thead className="text-white uppercase border-b border-gray-300 bg-fix">
                        <tr className=''>
                            {/* <th scope="col" className="text-center border px-1 whitespace-nowrap">
                                No.
                            </th> */}
                            <th scope="col" className="text-center border px-1 whitespace-nowrap">
                                Date
                            </th>
                            <th scope="col" className="text-center border px-1 whitespace-nowrap ">
                                Present
                            </th>
                            <th scope="col" className="text-center border px-1 whitespace-nowrap ">
                                Site Code
                            </th>
                            <th scope="col" className="text-center border px-1 whitespace-nowrap ">
                                Time
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
                            <th scope="col" className="text-center border px-6 py-1 whitespace-nowrap">
                                Marked By
                            </th>

                            {
                                localStorage.getItem("role") == "Admin"
                                    ? <th scope="col" className="text-center border px-3 py-1 whitespace-nowrap">
                                        Edit
                                    </th>
                                    : <></>
                            }


                        </tr>
                    </thead>
                    <tbody className=''>

                        {
                            attendance.map((ele, index) =>
                                <tr className="bg-white border-b hover:bg-gray-50 text-[10px] lg:text-sm">

                                    {/* <th scope="row" className="text-center border py-1 font-medium text-fix ">
                                        {index + 1}
                                    </th> */}
                                    <td className="text-center border py-1 px-1 whitespace-nowrap">
                                        {moment(ele.date).format("DD/MM/YYYY")}
                                    </td>
                                    <td className="text-center border px-1 py-1">
                                        {ele.attendance}
                                    </td>
                                    <td className="text-center border px-1 py-1">
                                        {ele.site_code}
                                    </td>
                                    <td className="text-center border px-1 py-1">
                                        {ele.time}
                                    </td>

                                    <td className="text-center border px-1 py-1">
                                        {ele.food}/-
                                    </td>
                                    <td className="text-center border px-1 py-1">
                                        {ele.travelling}/-
                                    </td>
                                    <td className="text-center border px-1 py-1">
                                        {ele.advance}/-
                                    </td>
                                    <td className="text-center border px-2 py-1 whitespace-wrap">
                                        {ele.remarks}
                                    </td>
                                    <td className="text-center border px-2 py-1 whitespace-wrap">
                                        {ele.marked_by}
                                    </td>

                                    {
                                        localStorage.getItem("role") == "Admin"
                                            ? <td className="text-center text-red-600 border px-3 py-1 whitespace-nowrap hover:underline underline-offset-2 cursor-pointer ">
                                                <Link to="/editattendance" state={{ values: ele }}>Edit</Link>
                                            </td>
                                            : <></>
                                    }



                                </tr>
                            )
                        }

                        <tr className='border p-1'>
                            <td colSpan={11} className='p-1 text-base'>
                                <span className='text-fix font-medium'> Total Present:</span> {temp.atte}
                            </td>
                        </tr>

                        <tr className='border p-1'>
                            <td colSpan={11} className='p-1 text-base'>
                                <span className='text-fix font-medium'> Total Food and Travelling:</span> {parseInt(temp.food) + parseInt(temp.travel)}/-
                            </td>
                        </tr>


                        <tr className='border p-1'>
                            <td colSpan={11} className='p-1 text-base'>
                                <span className='text-fix font-medium'> Advance:</span> {temp.adv}/-
                            </td>
                        </tr>


                        {
                            localStorage.getItem("role") == "Admin"
                                ?
                                <>
                                    <tr className='border p-1'>
                                        <td colSpan={11} className='p-1 text-base'>
                                            <span className='text-fix font-medium'> Total PF Amount:</span> {temp.pf}/-
                                        </td>
                                    </tr>
                                    <tr className='border p-1'>
                                        <td colSpan={11} className='p-1 text-base'>
                                            <span className='text-fix font-medium'> Total ESIC Amount:</span> {temp.esic}/-
                                        </td>
                                    </tr>
                                    <tr className='border p-1'>
                                        <td colSpan={11} className='p-1 text-base'>
                                            <span className='text-fix font-medium'> Total PT Amount:</span>{temp.pt}/-
                                        </td>
                                    </tr> <tr className='border p-1'>
                                        <td colSpan={11} className='p-1 text-base'>
                                            <span className='text-fix font-medium'> Total Balance:</span>{temp.bal}/-
                                        </td>
                                    </tr>
                                </>
                                : <></>
                        }




                    </tbody>
                </table>
            </div>

        </>
    )
}

export default AttendanceCard