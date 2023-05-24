import React from 'react'
import logo from '../logo.png';
import logo4 from '../logo4.png';

const Testing2 = () => {
  return (
    <div className='px-2 pt-20'>

      <div className=' md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1400px] relative mx-auto'>
        <div className='rounded bg-fix h-20 w-full flex justify-center items-center relative'>
          <img className='h-16 w-16 absolute left-0' srcSet={logo} />
          <p className=' text-center text-white text-2xl'>
            Pay Slip
          </p>
        </div>

        <div className='w-full pl-2 mt-2'>
          <p className='text-lg'><span className='text-fix'>ER Number: </span>ER0898</p>
          <p className='text-lg'><span className='text-fix'>Employee Name: </span>Mahendra Kumar Jangir</p>
          <p className='text-lg'><span className='text-fix'>Designation:: </span>Mason</p>

          <p className='text-lg '><span className='text-fix'>Aadhar Number: </span>449687311127</p>
          <p className='text-lg'><span className='text-fix'>PAN Number: </span>1234567890</p>

          <p className='text-lg'><span className='text-fix'>Bank Account: </span>32273500979</p>
          <p className='text-lg'><span className='text-fix'>IFSC: </span>SBIN0032001</p>

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
                    Total Days
                  </td>
                  <td className='text-center border-r'>
                    26.50
                  </td>
                </tr>

                <tr>
                  <td className='text-center border-r'>
                    Rate
                  </td>
                  <td className='text-center border-r'>
                    1200/-
                  </td>
                </tr>

                <tr>
                  <td className='text-center border-r'>
                    Total Wages
                  </td>
                  <td className='text-center border-r'>
                    31,800/-
                  </td>
                </tr>

                <tr>
                  <td className='text-center border-r'>
                    Travelling Allowance
                  </td>

                  <td className='text-center border-r'>
                    1,470 /-
                  </td>
                </tr>

                <tr>
                  <td className='text-center border-r'>
                    Food Allowance

                  </td>

                  <td className='text-center border-r'>
                    -
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
                    33,270/-
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
                  200/-
                </td>

              </tr>

              <tr>
                <td className='text-center border-r'>
                  Employee's Provident Fund
                </td>

                <td className='text-center border-r'>
                  -
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
                  19,510/-
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
                  -
                </td>
              </tr>

              <tr>
                <td className='text-center border font-semibold'>
                  Total Deductions
                </td>

                <td className='text-center border font-semibold'>
                  19,710/-
                </td>
              </tr>

              <tr>
                <td className='text-center border font-semibold'>
                  Net Pay
                </td>

                <td className='text-center border font-semibold'>
                  13,560/-
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
            <p>Mahendra Kumar Jangir</p>
          </div>

        </div>

      </div>

    </div >
  )
}

export default Testing2