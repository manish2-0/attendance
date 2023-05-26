import React from 'react'

const Testing3 = () => {
    return (
        <div className=''>
            <div className='m-[2px] bg-fix flex justify-center p-2'>
                <div className='flex'>
                    <div className='mx-4'>
                        <p className='text-center text-white text-xl'>Recieved</p>
                        <p className='text-center text-green-400 text-lg'>₹10,00,000</p>
                    </div>
                    <div className='mx-4'>
                        <p className='text-center text-white text-xl'>Available</p>
                        <p className='text-center text-white text-lg'>₹10,00,000</p>
                    </div>
                    <div className='mx-4'>
                        <p className='text-center text-white text-xl'>Expenses</p>
                        <p className='text-center text-red-500 text-lg'>₹10,00,000</p>
                    </div>
                </div>

            </div>

            <div className='mx-[2px] flex justify-center'>
                <div className='max-w-lg w-[400px] bg-gray-300'>
                    <div className='w-full p-2 flex my-2 border'>
                        <span className='h-[40px] w-[40px] rounded-full bg-slate-100'></span>
                        <div className='w-full h-[40px] border mx-1'>
                            <p className='text-sm'>Manish Kumavat</p>
                            <p className='text-sm'>MAnish Kumavat</p>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Testing3