import React, { useState } from 'react'
import Loader from './Loader'
import useModal from '../hooks/useModal';
import Modal from '../modals/Modal';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router';

const NewSite = () => {

    const [loading, setloading] = useState(false);
    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const api = useAxiosPrivate();

    const navigate = useNavigate();

    const [sitename, setsitename] = useState({ "name": "" });

    const handlechange = (event) => {
        event.preventDefault();
        const val = event.target.value;
        setsitename({ "name": val });
    }

    const submitform = async (e) => {
        e.preventDefault();
        setloading(true);

        try {
            await api.post('/site/site-register', JSON.stringify(sitename)).then(async function (response) {
                // console.log(response)
                if (response.data.status == 1) {
                    setloading(false);
                    setmodal(true);
                    await setmodalmessage({
                        "text1": "Done",
                        "text2": "Site added succesfully."
                    });

                    navigate('/');

                }
                else {
                    setloading(false);
                    setmodal(true);
                    setmodalmessage({
                        "text1": "Error Occured",
                        "text2": "Something went wrong."
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
                <h2 className='my-2 text-2xl md:text-3xl underline text-fix'>Add New Site:</h2>
                <div className='relative flex items-center justify-center h-auto m-2 rounded-md md:container bg-gray-50'>
                    {/* <span className='z-[-1] absolute w-full h-full rounded-lg left-[5px] top-[5px] border border-blue-800'> </span> */}

                    <form onSubmit={submitform} className='relative z-10 h-auto px-5 py-5 border rounded-lg shadow-lg md:w-3/4 lg:w-3/5 border-slate-300'  >

                        <h1 className='text-2xl mb-3 text-gray-900 underline underline-offset-4 text-fix'>Site Information:</h1>

                        <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
                            <label className='min-w-fit pr-2 text-lg text-gray-900'>Site Name:</label>
                            <input onChange={handlechange} name="site" className='w-full px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Site name...' required />
                        </div>

                        <div className='flex items-center justify-start'>
                            <button className="rounded-sm ani-button">Add New Site</button>
                        </div>
                    </form>

                </div>
            </div>

        </>
    )
}

export default NewSite