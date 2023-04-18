import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import useModal from '../hooks/useModal';
import Modal from '../modals/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const EditSite = () => {

    const [loading, setloading] = useState(false);
    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const location = useLocation();
    const { values } = location.state;

    const api = useAxiosPrivate();

    const [sitename, setsitename] = useState(values);
    const navigate = useNavigate();

    useEffect(() => {
        setsitename(val => ({ ...val, "name": values.site_name }));
    }, []);

    const handlechange = (event) => {
        event.preventDefault();

        const name = event.target.name;
        const val = event.target.value;

        setsitename(value => ({ ...value, [name]: val }));
    }

    const submitform = async (e) => {
        e.preventDefault();
        setloading(true);

        try {
            await api.put(`site/site-update/${values.site_code}`, JSON.stringify(sitename)).then(async function (response) {
                if (response.data.status == 1) {
                    setloading(false);
                    setmodal(true);
                    await setmodalmessage({
                        "text1": "Done",
                        "text2": "Site edited succesfully."
                    });
                    navigate('/allsite');
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
            await setmodalmessage({
                "text1": "Error Occured",
                "text2": "No server response."
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
                <h2 className='my-2 text-2xl md:text-3xl underline text-fix'>Edit Site:</h2>
                <div className='relative flex items-center justify-center h-auto m-2 rounded-md md:container bg-gray-50'>

                    <form onSubmit={submitform} className='relative z-10 h-auto px-5 py-5 border rounded-lg shadow-lg md:w-3/4 lg:w-3/5 border-slate-300'  >

                        <h1 className='text-2xl mb-3 text-gray-900 underline underline-offset-4 text-fix'>Site Information:</h1>

                        <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
                            <label className='min-w-fit pr-2 text-lg text-gray-900'>Site Name:</label>
                            <input defaultValue={sitename.site_name} onChange={handlechange} name="name" className='w-full px-2 py-2 text-[18px] border rounded-md border-slate-300 bg-transparent text-black' type="text" placeholder='Site name...' required />

                        </div>

                        <h1 className='text-2xl mb-3 text-gray-900 underline underline-offset-4 text-fix'>Site Status:</h1>

                        <div className='flex flex-wrap md:flex-nowrap w-full items-center mb-4'>
                            <label className='min-w-fit pr-2 text-lg text-gray-900'>Status:</label>
                            <select defaultValue={sitename.status} onChange={handlechange} name="status" className="text-lg pl-2 pr-3 py-1 border rounded border-slate-300">
                                <option>Ongoing</option>
                                <option>Done</option>
                            </select>
                        </div>

                        <div className='flex items-center justify-start'>
                            <button className="rounded-sm ani-button">Done</button>
                        </div>
                    </form>

                </div>
            </div>

        </>
    )
}

export default EditSite