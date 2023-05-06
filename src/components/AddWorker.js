import React, { useState } from 'react'
import Loader from './Loader';
import Modal from '../modals/Modal';
import useModal from '../hooks/useModal';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AddWorker = () => {

  const [loading, setloading] = useState(false);

  const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

  const { auth, setauth, setadminname } = useAuth();

  const api = useAxiosPrivate();

  const navigate = useNavigate();

  const [inputs, setinputs] = useState({
    "aadhar": "",
    "pan": "-",

    "name": "",
    "designation": "Choose a option..",
    "address": "-",
    "contact": "0",

    "bank_name": "-",
    "acc_no": "0",
    "ifsc": "-",
    "bank_branch": "-",

    "third_person": "-",
    "supervisor": "-",

    "pf": "No",
    "esic": "No",
    "pt": "No",


    "doj": "-",
    "dob": "-",

    "rate": ""


  });

  function handlechange(event) {
    event.preventDefault();

    const name = event.target.name;
    const value = event.target.value;

    if (value == "") {
      if (name == "contact" || name == "account_no" || name == "rate") {
        setinputs(values => ({ ...values, [name]: "0" }));
      }
      else {
        setinputs(values => ({ ...values, [name]: "-" }));
      }
    }
    else {
      setinputs(values => ({ ...values, [name]: value }))

    }

  }

  const formsubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    // console.log(auth)

    try {
      await api.post('/employee/employee-register', JSON.stringify(inputs)).then(async function (response) {
        // console.log(response)
        if (response.data.status == 1) {
          setloading(false);
          setmodal(true);
          await setmodalmessage({
            "text1": "Done",
            "text2": "Data added succesfully."
          });

          navigate('/');

        }
        else {
          setloading(false);
          setmodal(true);
          setmodalmessage({
            "text1": "Error Occured",
            "text2": "Aadhar Number already exists."
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


      <div className='min-h-screen relative flex flex-col items-center mx-2 border-gray-200 rounded-md z-0 pt-20 pb-[24px] bg-gray-50'>
        <h2 className='my-2 mb-4 text-4xl underline text-fix'>New Worker Form:</h2>
        <div className='relative flex items-center justify-center h-auto m-2 rounded-md md:container bg-gray-50'>

          <form onSubmit={formsubmit} className='relative z-10 h-auto px-5 py-5 border rounded-lg shadow-lg md:w-3/4 lg:w-3/5 border-slate-300'  >

            <h1 className='text-2xl mb-3 text-gray-900 underline underline-offset-4 text-fix'>Basic Information:</h1>

            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='min-w-fit pr-2 text-lg text-gray-900'>Aadhar No:</label>
              <input onChange={handlechange} onWheel={e => e.target.blur()} name="aadhar" className='w-full md:w-48 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Aadhar Number...' required />
            </div>

            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='min-w-fit pr-2 text-lg text-gray-900'>PAN No:</label>
              <input onChange={handlechange} onWheel={e => e.target.blur()} name="pan" className='w-full md:w-48 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='PAN Number...' />
            </div>

            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className=' text-lg min-w-fit pr-2 text-gray-900' htmlFor="">Name:</label>
              <input onChange={handlechange} name="name" className='w-full md:w-3/4 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Name' required />
            </div>

            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">Designation:</label>
              {/* <input onChange={handlechange} name="designation" className='w-full px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Designation' /> */}
              <select onChange={handlechange} name="designation" className="w-fit px-2 py-2 text-lg text-black bg-transparent border-2 border-slate-300 rounded-sm outline-none" >
                <option selected className=''>Choose a option..</option>
                <option>Mason</option>
                <option>Helper</option>
                <option>Plaster Mason</option>
                <option>Polish Mason</option>
                <option>Supervisor</option>
                <option>Office Staff</option>
              </select>
            </div>

            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">PF:</label>
              <select onChange={handlechange} name="pf" className="w-fit px-2 py-2 text-lg text-black bg-transparent border-2 border-slate-300 rounded-sm outline-none" >
                <option>Yes</option>
                <option selected>No</option>
              </select>
            </div>
            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">ESIC:</label>
              <select onChange={handlechange} name="esic" className="w-fit px-2 py-2 text-lg text-black bg-transparent border-2 border-slate-300 rounded-sm outline-none" >
                <option>Yes</option>
                <option selected>No</option>
              </select>
            </div>
            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">PT:</label>
              <select onChange={handlechange} name="pt" className="w-fit px-2 py-2 text-lg text-black bg-transparent border-2 border-slate-300 rounded-sm outline-none" >
                <option>Yes</option>
                <option selected>No</option>
              </select>
            </div>

            {/* <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">PF:</label>
              <input type="radio" id="pf" name="pf" value="Yes" />
              <label for="pf">Yes</label>
              <input type="radio" id="pf1" name="pf" value="No" />
              <label for="pf2">No</label>

            </div> */}

            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">Address:</label>
              <input onChange={handlechange} name="address" className='w-full px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Address' />
            </div>

            <div className='flex w-full items-center mb-2'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">Contact:</label>
              <input onChange={handlechange} onWheel={e => e.target.blur()} name="contact" className='w-full md:w-1/2 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Contact' />
            </div>

            <h1 className='text-2xl mb-3 text-gray-900 underline underline-offset-4 text-fix'>Bank Information:</h1>

            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">Bank Name:</label>
              <input onChange={handlechange} name="bank_name" className='w-full px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Bank Name' />
            </div>

            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">Account Number:</label>
              <input onChange={handlechange} onWheel={e => e.target.blur()} name="acc_no" className='w-full px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Account Number' />
            </div>


            <div className='flex flex-wrap sm:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">IFSC Code:</label>
              <input onChange={handlechange} onWheel={e => e.target.blur()} name="ifsc" className='w-60 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='IFSC' />
            </div>

            <div className='flex flex-wrap sm:flex-nowrap w-full items-center mb-2'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">Bank Branch:</label>
              <input onChange={handlechange} name="bank_branch" className='w-full px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Branch' />
            </div>

            <h1 className='text-2xl mb-3 text-gray-900 underline underline-offset-4 text-fix'>Extra Information:</h1>

            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">Third Person:</label>
              <input onChange={handlechange} name="third_person" className='w-full px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Third Person' />
            </div>

            <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">Supervisor:</label>
              <input onChange={handlechange} name="supervisor" className='w-full px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Supervisor' />
            </div>

            <div className='flex flex-wrap w-full items-center mb-4'>
              <label className='w-36 text-lg text-gray-900' htmlFor="">Date of Joining:</label>
              <input onChange={handlechange} name="doj" className='w-fit px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="date" />
            </div>

            <div className='flex flex-wrap w-full items-center mb-2'>
              <label className='text-lg w-36 pr-2 text-gray-900' htmlFor="">Date of Birth:</label>
              <input onChange={handlechange} name="dob" className='w-fit px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="date" />
            </div>

            <h1 className='text-2xl mb-3 text-gray-900 underline underline-offset-4 text-fix'>Daily Rate:</h1>

            <div className='flex w-full items-center mb-4'>
              <label className='text-lg min-w-fit pr-2 text-gray-900' htmlFor="">Base Rate:</label>
              <input onChange={handlechange} onWheel={e => e.target.blur()} name="rate" className='w-full sm:w-52 px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="number" placeholder='Base Rate' required />
            </div>

            <div className='flex items-center justify-start'>
              <button className="rounded-sm ani-button">Add Worker</button>
            </div>
          </form>

        </div>
      </div>

    </>
  )
}

export default AddWorker