import React, { useEffect, useState } from 'react'
import logo from '../logo.png';
import { useLocation } from 'react-router-dom';

const PaySlipEdited = () => {

    const location = useLocation();
    const { data, personal, month, year } = location.state;

    const [calcu, setcalcu] = useState({
        "actual": 0,
        "basic": 0,
        "da": 0,
        "travel": 0,
        "food": 0,
        "other": 0,
        "pf": 0,
        "pt": 0,
        "esic": 0,
        "advance": 0,
        "balance": 0
    })

    useEffect(() => {
        console.log(data)
        console.log(personal)

        let actual = parseInt(data.actual);
        let basic = 0;
        let da = 0;
        let travel = 0;
        let food = 0;
        let other = 0;
        let pf = 0;
        let pt = 0;
        let esic = 0;
        let advance = 0;
        let balance = 0;

        basic = parseInt(0.5 * parseFloat(data.actual));
        da = parseInt(0.3 * parseFloat(data.actual));
        travel = parseInt(0.1 * parseFloat(data.actual));
        food = parseInt(0.05 * parseFloat(data.actual));
        other = data.actual - basic - da - travel - food;

        pf = parseInt(data.pf);
        pt = parseInt(data.pt);
        esic = parseInt(data.esic);
        advance = parseInt(data.adv);

        balance = parseInt(data.actual) - advance - pf - pt - esic;

        setcalcu({ "actual": actual, "basic": basic, "da": da, "travel": travel, "food": food, "other": other, "pf": pf, "pt": pt, "esic": esic, "advance": advance, "balance": balance });

    }, []);

    const printwindow = async (e) => {
        e.preventDefault();
        window.print();
    }

    return (
        <div className='px-2 pt-24' id='payslipedited'>

            <div className=' md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1400px] relative mx-auto'>
                <div className='rounded bg-fix h-20 w-full flex justify-center items-center relative'>
                    <img className='h-16 w-16 absolute left-0' srcSet={logo} />
                    <p className=' text-center text-white text-2xl'>
                        Pay Slip
                    </p>
                    <p className='h-full flex items-center absolute right-0 mr-3 text-white'>
                        {month},{year}
                    </p>
                </div>

                <div className='w-full pl-2 mt-2'>
                    <p className='text-lg'><span className='text-fix'>ER Number: </span>{personal.er_no}</p>
                    <p className='text-lg'><span className='text-fix'>Employee Name: </span>{personal.name}</p>
                    <p className='text-lg'><span className='text-fix'>Designation:: </span>{personal.designation}</p>

                    <p className='text-lg '><span className='text-fix'>Aadhar Number: </span>{personal.aadhar}</p>
                    <p className='text-lg'><span className='text-fix'>PAN Number: </span>{personal.contact}</p>

                    <p className='text-lg'><span className='text-fix'>Bank Account: </span>{personal.acc_no}</p>
                    <p className='text-lg'><span className='text-fix'>IFSC: </span>{personal.ifsc}</p>

                    <button onClick={printwindow} id='payslipeditedbutton' class="bg-fix hover:bg-blue-800 text-white font-medium py-1 px-5 rounded my-1">Print</button>

                </div>

                <div className='w-full flex flex-wrap justify-center'>
                    {/* left  */}
                    <div className=' min-w-[300px] mt-2 w-1/2'>
                        <table className='w-full border'>
                            <tr>
                                <th className='w-2/3 px-6 border border-gray-400'>
                                    Emoluments
                                </th>
                                <th className='w-1/3 px-3 border border-gray-400'>
                                    Amount
                                </th>
                            </tr>

                            <>

                                <tr>
                                    <td className='text-center border-r'>
                                        Basic
                                    </td>
                                    <td className='text-center border-r'>
                                        {calcu.basic}/-
                                    </td>
                                </tr>

                                <tr>
                                    <td className='text-center border-r'>
                                        DA
                                    </td>
                                    <td className='text-center border-r'>
                                        {calcu.da}/-
                                    </td>
                                </tr>

                                <tr>
                                    <td className='text-center border-r'>
                                        Travelling Allowance
                                    </td>

                                    <td className='text-center border-r'>
                                        {calcu.travel}/-
                                    </td>
                                </tr>

                                <tr>
                                    <td className='text-center border-r'>
                                        Food Allowance

                                    </td>

                                    <td className='text-center border-r'>
                                        {calcu.food}/-
                                    </td>
                                </tr>

                                <tr>
                                    <td className='text-center border-r'>
                                        Others
                                    </td>
                                    <td className='text-center border-r'>
                                        {calcu.other}/-
                                    </td>
                                </tr>

                                <tr>
                                    <td className='text-center border-r'>
                                        Medical Allowance
                                    </td>

                                    <td className='text-center border-r'>
                                        -
                                    </td>
                                </tr>

                                <tr>
                                    <td className='text-center border-r'>
                                        Bonus
                                    </td>

                                    <td className='text-center border-r'>
                                        -
                                    </td>
                                </tr>

                                <tr>
                                    <td className='text-center border-r'>
                                        Convenyance
                                    </td>

                                    <td className='text-center border-r'>
                                        -
                                    </td>
                                </tr>

                                <tr>
                                    <td className='text-center border-r'>
                                        -
                                    </td>
                                    <td className='text-center border-r'>
                                        -
                                    </td>
                                </tr>

                                <tr>
                                    <td className='text-center border-r'>
                                        -
                                    </td>
                                    <td className='text-center border-r'>
                                        -
                                    </td>
                                </tr>



                                <tr>
                                    <td className='text-center border font-semibold'>
                                        Gross Pay
                                    </td>

                                    <td className='text-center border font-semibold'>
                                        {data.actual}/-
                                    </td>
                                </tr>

                            </>




                        </table>
                    </div>

                    {/* Right */}
                    <div className='w-1/2 min-w-[300px] mt-2'>
                        <table className='w-full border'>
                            <tr>
                                <th className='w-2/3 px-6 border border-gray-400'>
                                    Deductions
                                </th>
                                <th className='w-1/3 px-3 border border-gray-400'>
                                    Amount
                                </th>
                            </tr>

                            <tr>
                                <td className='text-center border-r'>
                                    Profession Tax
                                </td>

                                <td className='text-center border-r'>
                                    {calcu.pt}/-
                                </td>

                            </tr>

                            <tr>
                                <td className='text-center border-r'>
                                    Employee's Provident Fund
                                </td>

                                <td className='text-center border-r'>
                                    {calcu.pf}/-
                                </td>

                            </tr>

                            <tr>
                                <td className='text-center border-r'>
                                    Carried Forward
                                </td>

                                <td className='text-center border-r'>
                                    -
                                </td>

                            </tr>

                            <tr>
                                <td className='text-center border-r'>
                                    Adjustments
                                </td>

                                <td className='text-center border-r'>
                                    -
                                </td>
                            </tr>

                            <tr>
                                <td className='text-center border-r'>
                                    Postal Life Insurance
                                </td>

                                <td className='text-center border-r'>
                                    -
                                </td>
                            </tr>

                            <tr>
                                <td className='text-center border-r'>
                                    Advance
                                </td>

                                <td className='text-center border-r'>
                                    {calcu.advance}/-
                                </td>
                            </tr>

                            <tr>
                                <td className='text-center border-r'>
                                    Group Insurance
                                </td>

                                <td className='text-center border-r'>
                                    -
                                </td>
                            </tr>

                            <tr>
                                <td className='text-center border-r'>
                                    Income Tax(TDS)
                                </td>

                                <td className='text-center border-r'>
                                    -
                                </td>
                            </tr>

                            <tr>
                                <td className='text-center border-r'>
                                    ESIC
                                </td>

                                <td className='text-center border-r'>
                                    {calcu.esic}/-
                                </td>
                            </tr>

                            <tr>
                                <td className='text-center border font-semibold'>
                                    Total Deductions
                                </td>

                                <td className='text-center border font-semibold'>
                                    {parseInt(calcu.actual) - parseInt(calcu.balance)}/-
                                </td>
                            </tr>

                            <tr>
                                <td className='text-center border font-semibold'>
                                    Net Pay
                                </td>

                                <td className='text-center border font-semibold'>
                                    {calcu.balance}/-
                                </td>
                            </tr>


                        </table>
                    </div>

                </div>

                <div className='flex justify-between mt-4'>
                    <div className=''>
                        <p className='text-fix text-center mb-1'>Checked By</p>
                        <p>Sumeet Dari</p>
                    </div>

                    <div className=''>
                        <p className='text-fix text-center mb-1'>Authorized By</p>
                        <p>Bajrang Lal Prajapati</p>
                    </div>

                    <div className=''>
                        <p className='text-fix text-center mb-1'>Recieved By</p>
                        <p>{personal.name}</p>
                    </div>

                </div>

            </div>

        </div >
    )
}

export default PaySlipEdited