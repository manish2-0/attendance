import React from 'react'
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const ExtraInformation = () => {

    const location = useLocation();
    const { values } = location.state;
    // console.log(values);

    return (
        <div className='pt-20 px-2'>
            <div className='px-2 mt-2 border max-w-[1000px] mx-auto'>
                <>

                    <p className='text-fix text-center text-xl sm:text-2xl underline underline-offset-4 font-semibold mt-2'>Extra Information:</p>
                    <p className='text-fix text-xl underline underline-offset-4 font-semibold mt-2'>Aadhar and PAN Information:</p>

                    <div className='flex sm:flex-row flex-col sm:justify-between flex-wrap'>

                        <div className='md:w-1/2 flex'>
                            <h1 className='text-fix '>Aadhar No:</h1>
                            <p>{values.aadhar}</p>
                        </div>

                        <div className='md:w-1/2 flex'>
                            <h1 className='text-fix w-fit'>PAN No:</h1>
                            <p>{values.pan}</p>
                        </div>

                    </div>
                </>

                <>
                    {/* <p>Bank Inforamtion:</p> */}
                    <p className='text-fix text-xl underline underline-offset-4 font-semibold mt-2'>Bank Inforamtion:</p>


                    <div className='flex flex-wrap'>
                        <h1 className='text-fix w-fit'>Bank Name:</h1>
                        <p>{values.bank_name}</p>
                    </div>

                    <div className='flex flex-wrap'>
                        <h1 className='text-fix w-fit'>Account Number:</h1>
                        <p>{values.acc_no}</p>
                    </div>

                    <div className='flex flex-wrap'>
                        <h1 className='text-fix w-fit'>IFSC Code:</h1>
                        <p>{values.ifsc}</p>
                    </div>

                    <div className='flex flex-wrap'>
                        <h1 className='text-fix w-fit'>Bank Branch:</h1>
                        <p>{values.bank_branch}</p>
                    </div>

                </>

                <>


                    <p className='text-fix text-xl underline underline-offset-4 font-semibold mt-2'>Extra Inforamtion:</p>


                    <div className='flex flex-wrap'>
                        <h1 className='text-fix w-fit'>Third Person:</h1>
                        <p>{values.third_person}</p>
                    </div>

                    <div className='flex flex-wrap'>
                        <h1 className='text-fix w-fit'>Supervisor:</h1>
                        <p>{values.supervisor}</p>
                    </div>

                    <div className='flex flex-wrap'>
                        <h1 className='text-fix w-fit'>Date of Birth:</h1>
                        <p>{moment(values.dob).format("DD/MM/YYYY")}</p>
                    </div>



                </>

            </div>

        </div>
    )
}

export default ExtraInformation