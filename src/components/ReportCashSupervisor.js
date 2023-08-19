import React, { useState } from 'react'
import Loader from './Loader';
import Modal from '../modals/Modal';
import useModal from '../hooks/useModal';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

const ReportCashSupervisor = () => {

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
    setloading(true);

    if (inputs.from == "" || inputs.to == "") {
      setloading(false);
      setmodal(true);
      setmodalmessage({
        "text1": "Error",
        "text2": "Please select the date."
      });

      return 0;
    }

    try {
      await api.post('cash/cash-supervisor', JSON.stringify(inputs)).then(async function (response) {
        if (response?.data?.data) {
          setdata(response.data.data)
          setloading(false);
          setmodal(true);
          await setmodalmessage({
            "text1": "Done",
            "text2": "Attendance found."
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
          <h1 className='text-2xl text-fix'>Cash Labour Report</h1>

          {/* <div className='flex flex-wrap flex-row'>
            <form onSubmit={submitform}>

              <div className='flex flex-wrap flex-row mb-2'>

                <div className='flex items-center flex-wrap pr-6'>
                  <h1 className='text-fix text-lg w-fit pr-1'>Date:</h1>
                  <input onChange={handlechange} type='date' name='date' className='border rounded border-slate-300' />
                </div>

              </div>

              <button class="bg-fix hover:bg-blue-800 text-white font-bold py-1 px-5 rounded mb-1 mt-1">
                Get
              </button>

            </form>

          </div> */}

          <div className='flex flex-wrap flex-row'>
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

              </div>

              <button class="bg-fix hover:bg-blue-800 text-white font-bold py-1 px-5 rounded mb-1 mt-1 mr-2">
                Get
              </button>

            </form>

          </div>

          <h1 className='text-lg text-slate-600'> <span className='underline underline-offset-2 text-fix'>Cash Labour Attendance:</span> {inputs.date}</h1>

        </div>

        <div className="relative overflow-x-auto scrollbar-hide">
          <table className="container w-auto md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1400px] m-1 mx-auto text-left text-gray-500 border shadow">
            <thead className="text-white border-b border-gray-300 bg-fix">
              <tr className='text-sm '>
                <th scope="col" className="text-center border px-2 whitespace-nowrap">
                  No.
                </th>
                <th scope="col" className="text-center border px-2 whitespace-nowrap">
                  Date
                </th>
                <th scope="col" className="text-center border px-6 whitespace-nowrap ">
                  Name
                </th>
                <th scope="col" className="text-center border px-2 whitespace-nowrap ">
                  Present
                </th>
                <th scope="col" className="text-center border px-2 whitespace-nowrap ">
                  Site Code
                </th>
                <th scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                  Rate
                </th>
                <th scope="col" className="text-center border px-2 py-1 whitespace-nowrap">
                  Food and Travelling
                </th>
                <th scope="col" className="text-center border px-1 py-1 whitespace-nowrap">
                  Time
                </th>
                <th scope="col" className="text-center border px-3 py-1 whitespace-nowrap">
                  Remarks
                </th>
                <th scope="col" className="text-center border px-3 py-1 whitespace-nowrap">
                  Edit
                </th>


              </tr>
            </thead>
            <tbody className=''>

              {
                data.length == 0
                  ? <tr className="bg-white border-b hover:bg-gray-50 text-base">
                    <td colSpan={9} className="px-2 border py-1 font-medium text-gray-900 whitespace-nowrap ">
                      No data found
                    </td>
                  </tr>
                  : data.map((ele, no) =>
                    <tr className="bg-white border-b hover:bg-gray-50 text-[12px]">

                      <th scope="row" className="text-center border py-1 font-medium text-gray-900 whitespace-nowrap ">
                        {no + 1}
                      </th>

                      <td className="text-center border px-2 py-1 whitespace-wrap">
                        {moment(ele.date).format("DD/MM/YYYY")}
                      </td>
                      <td className="text-center border px-2 py-1 whitespace-wrap">
                        {ele.name}
                      </td>

                      <td className="text-center border px-1 py-1">
                        {ele.present}
                      </td>

                      <td className="text-center border px-1 py-1">
                        {ele.site_code}
                      </td>
                      <td className="text-center border px-1 py-1">
                        {ele.rate}/-
                      </td>
                      <td className="text-center border px-1 py-1">
                        {ele.food}/-
                      </td>
                      <td className="text-center border px-1 py-1">
                        {ele.time}
                      </td>
                      <td className="text-center border px-2 py-1 whitespace-wrap">
                        {ele.remarks}
                      </td>

                      {
                        moment(ele.date).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")
                          ? <td id='hideedit1' className="text-center border px-1 py-1">
                            <Link state={{ values: ele }} to="/editcash" className="font-medium text-fix hover:underline">Edit</Link>
                          </td>
                          : <td id='hideedit1' className="text-center border px-1 py-1">
                            Not Editable
                          </td>
                      }



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

export default ReportCashSupervisor