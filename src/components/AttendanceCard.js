import React, { useState, useEffect } from 'react'
import WorkerInformation from './WorkerInformation';
import useSearch from '../hooks/useSearch';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loader from './Loader';

const AttendanceCard = ({ user }) => {

    const numFor = Intl.NumberFormat('en-IN');

    const [loading, setloading] = useState(false);

    const { data, setdata, attendance, setattendance, attendance2, setattendance2 } = useSearch();

    const [temp, settemp] = useState({
        "adv": 0,
        "food": 0,
        "travel": 0,
        "atte": 0
    });

    const api = useAxiosPrivate();

    // const [attendance2, setattendance2] = useState([]);

    useEffect(() => {

        // setattendance2([]);

        let adv = 0;
        let food = 0;
        let travel = 0;
        let atte = 0.00;
        let bal = 0;
        let actualtotal = 0;

        let pf = 0;
        let pt = 0;
        let esic = 0;

        // For Redmarks
        // if (user.designation == "Office Staff") {
        //     for (let i = 0; i < attendance.length; i++) {

        //         let a = attendance[i].time;
        //         const myArray = a.split(" ");
        //         // console.log(myArray)

        //         let val1 = myArray[0].split(":");
        //         // let val2 = myArray[2].split(":");

        //         // console.log(val1)
        //         setattendance2(val => [...val, val1]);

        //         // console.log(val2)
        //         // settime1(val1);
        //         // settime2(val2);

        //         // sett1(myArray[0]);
        //         // sett2(myArray[2]);


        //         // setdata(val => ({ ...val, time: a }))

        //     }
        //     console.log(attendance2)
        // }


        // For calculations
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
        if (user.pf == "Yes") {
            let perc = 0;
            perc = 0.12 * parseInt(actualtotal);
            perc = perc.toFixed(0);
            if (perc >= 1800) {
                pf = 1800;
                // setpf(1800);
            }
            else {
                pf = perc;
            }

        }
        else {
            pf = 0;
        }


        // For ESIC
        if (user.esic == "Yes") {
            if (user.rate <= 700) {
                esic = 0.0075 * parseInt(actualtotal);
                esic = esic.toFixed(0);
            }

        }
        else {
            esic = 0;
        }


        // For PT 
        if (user.pt == "Yes") {
            if (actualtotal > 7500 && actualtotal <= 10000) {
                pt = 175;
            }
            else if (actualtotal > 10000) {
                pt = 200;
            }
            else {
                pt = 0;
            }
        }
        else {
            pt = 0;
        }


        bal = parseFloat(parseInt(actualtotal) - adv - pf - esic - pt).toFixed(0);

        settemp({ "adv": adv, "food": food, "travel": travel, "atte": atte, "bal": bal, "actual": actualtotal, "pf": pf, "esic": esic, "pt": pt });
    }, [attendance]);

    const printwindow = async (e) => {
        e.preventDefault();
        window.print();
    }

    const deletefile = async (f) => {
        // ref.current.click();
        setloading(true)

        try {
            await api.delete(`/attendance/attendance-delete/${f.sr_no}`).then(async function (response) {
                if (response.data.status == 1) {
                    setattendance(attendance.filter((e) => {
                        return e !== f;
                    }));
                    setloading(false);

                    // window.alert("File deleted succesfully");
                }
                else {
                    setloading(false);
                }


            })

        } catch (error) {
            setloading(false);
            

        }

    }


    return (
        <>

            {
                loading
                    ? <Loader />
                    : <></>
            }

            <span className='w-full block border mb-2'></span>

            <p className='text-fix'>Attendance for: {data.month},{data.year}</p>

            <div id='cardbutton' className='flex'>
                <button onClick={printwindow} class="bg-fix hover:bg-blue-800 text-white font-medium py-1 px-5 rounded my-1">Print</button>

                {
                    localStorage.getItem("role") == "Admin"
                        ?
                        <>
                            <Link state={{ data: temp, personal: user, month: data.month, year: data.year }} to="/payslip" className="bg-fix hover:bg-blue-800 text-white font-medium py-1 px-5 rounded my-1 ml-2">Summary</Link>
                            <Link state={{ data: temp, personal: user, month: data.month, year: data.year }} to="/payslipedited" className="bg-fix hover:bg-blue-800 text-white font-medium py-1 px-5 rounded my-1 ml-2">Pay Slip </Link>
                        </>
                        : <></>
                }

            </div>

            <div className="relative overflow-x-auto scrollbar-hide">


                <table className=" md:w-full m-1 mx-auto text-xs lg:text-sm text-left text-gray-500 border shadow">
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
                            <th id='cardremarks' scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                                Remarks
                            </th>
                            <th id='cardmarkedby' scope="col" className="text-center border px-6 py-1 whitespace-nowrap">
                                Marked By
                            </th>

                            {
                                localStorage.getItem("role") == "Admin"
                                    ? <th id='cardedit' scope="col" className="text-center border px-3 py-1 whitespace-nowrap">
                                        Edit
                                    </th>
                                    : <></>
                            }

                            {
                                localStorage.getItem("role") == "Admin" && localStorage.getItem('admin_id') == "manish"
                                    ? <th id='cardedit' scope="col" className="text-center border px-3 py-1 whitespace-nowrap">
                                        Delete
                                    </th>
                                    : <></>
                            }


                        </tr>
                    </thead>
                    <tbody className=''>

                        {
                            attendance.map((ele, index) =>
                                // <tr className="bg-white border-b hover:bg-gray-50 text-[10px] lg:text-sm" >
                                <tr className={
                                    user.designation == "Office Staff"
                                        ? (attendance2[index][0] >= "09" && attendance2[index][1] > "45") || (attendance2[index][0] >= "10" && attendance2[index][1] >= "0" && attendance2[index][1] <= "59")
                                            ? "bg-red-400 border-b text-gray-200 text-[10px] lg:text-sm"
                                            : "bg-white border-b hover:bg-gray-50 text-[10px] lg:text-sm"
                                        : "bg-white border-b hover:bg-gray-50 text-[10px] lg:text-sm"}
                                >

                                    {/* <th scope="row" className="text-center border py-1 font-medium text-fix ">
                                        {index + 1}
                                    </th> */}
                                    < td className="text-center border py-1 px-1 whitespace-nowrap" >
                                        {moment(ele.date).format("DD/MM/YYYY")}
                                    </td>
                                    <td className="text-center border px-1 py-1">
                                        {parseFloat(ele.attendance).toFixed(6)}
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
                                    <td id='cardremarksdata' className="text-center border px-2 py-1 whitespace-wrap">
                                        {ele.remarks}
                                    </td>
                                    <td id='cardmarkedbydata' className="text-center border px-2 py-1 whitespace-wrap">
                                        {ele.marked_by}
                                    </td>

                                    {
                                        localStorage.getItem("role") == "Admin"
                                            ? <td id='cardeditdata' className="text-center text-red-600 border px-3 py-1 whitespace-nowrap hover:underline underline-offset-2 cursor-pointer ">
                                                <Link to="/editattendance" state={{ values: ele, personinformation: user }}>Edit</Link>
                                            </td>
                                            : <></>
                                    }

                                    {
                                        localStorage.getItem("role") == "Admin" && localStorage.getItem('admin_id') == "manish"
                                            ? <td id='cardeditdata' className="text-center text-red-600 border px-3 py-1 whitespace-nowrap hover:underline underline-offset-2 cursor-pointer ">
                                                <button onClick={() => { deletefile(ele) }}>Delete</button>
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
                                <span className='text-fix font-medium'> Total Food and Travelling:</span> {numFor.format(parseInt(temp.food) + parseInt(temp.travel))}/-
                            </td>
                        </tr>


                        <tr className='border p-1'>
                            <td colSpan={11} className='p-1 text-base'>
                                <span className='text-fix font-medium'> Advance:</span> {numFor.format(temp.adv)}/-
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
                                            <span className='text-fix font-medium'> Total PT Amount:</span>{numFor.format(temp.pt)}/-
                                        </td>
                                    </tr> <tr className='border p-1'>
                                        <td colSpan={11} className='p-1 text-base'>
                                            <span className='text-fix font-medium'> Total Balance:</span>{numFor.format(temp.bal)}/-
                                        </td>
                                    </tr>
                                </>
                                : <></>
                        }




                    </tbody>
                </table >
            </div >

        </>
    )
}

export default AttendanceCard