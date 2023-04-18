import Reac, { useState, useEffect } from 'react'
import Loader from './Loader'
import useModal from '../hooks/useModal';
import Modal from '../modals/Modal';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const ViewAllSite = () => {

    const [loading, setloading] = useState(false);

    const [site, setsite] = useState([]);

    const api = useAxiosPrivate();

    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const getall = async () => {
        setloading(true);
        try {
            await api.get('site/site-get-all').then(response => {
                if (response?.data?.data) {
                    // console.log(response.data.data)
                    setsite(response.data.data)
                    setloading(false);
                }
                else {
                    setloading(false);
                    setmodal(true)
                    setmodalmessage({
                        "text1": "Error",
                        "text2": "No data found."
                    });
                }
            })

        } catch (error) {
            setloading(false);
            setmodal(true)
            setmodalmessage({
                "text1": "Error",
                "text2": "Could not fetch data please refresh page."
            });

        }
    }

    useEffect(() => {
        getall();
    }, []);

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
            <div className='p-2 pt-20'>

                <h2 className='my-2 text-center text-xl sm:text-2xl lg:text-3xl  underline text-fix'>All Sites:</h2>

                <div className="relative overflow-x-auto scrollbar-hide">
                    <table className="container w-auto md:w-[700px] xl:w-[1150px] m-1 mx-auto text-sm text-left text-gray-500 border shadow">
                        <thead className="text-white uppercase border-b border-gray-300 bg-fix">
                            <tr className='text-[16px] '>
                                <th scope="col" className="text-center border px-6 whitespace-nowrap">
                                    No.
                                </th>

                                <th scope="col" className="text-center border px-12 whitespace-nowrap ">
                                    Site Name
                                </th>
                                <th scope="col" className="text-center border px-2 whitespace-nowrap ">
                                    Site Code
                                </th>
                                <th scope="col" className="text-center border px-6 py-3 whitespace-nowrap">
                                    Status
                                </th>

                                {
                                    localStorage.getItem("role") == "Admin"
                                        ? <th scope="col" className="text-center border px-6 py-3 whitespace-nowrap">
                                            Edit
                                        </th>
                                        : <></>
                                }


                            </tr>
                        </thead>
                        <tbody className=''>
                            {
                                site.length == 0
                                    ? <tr className="bg-white border-b hover:bg-gray-50">

                                        <td colSpan={5} className="text-left text-lg sm:text-center border px-4 py-2 text-fix">
                                            No Site Found
                                        </td>

                                    </tr>
                                    :

                                    site.map((ele, index) =>
                                        <tr className="bg-white border-b hover:bg-gray-50">

                                            <th scope="row" className="text-center border py-2 font-medium text-gray-900 whitespace-nowrap ">
                                                {index + 1}
                                            </th>

                                            <td className="text-center border px-2 py-2 whitespace-nowrap">
                                                {ele.site_name}
                                            </td>
                                            <td className="text-center border px-2 py-2 whitespace-nowrap">
                                                {ele.site_code}
                                            </td>

                                            <td className="text-center border px-4 py-2 text-fix">
                                                {ele.status}
                                            </td>

                                            {
                                                localStorage.getItem("role") == "Admin"
                                                    ? <td className="text-center border px-4 py-2 text-red-600 hover:underline underline-offset-2">
                                                        <Link state={{ values: ele }} to="/editsite" className="font-medium hover:underline">Edit</Link>
                                                    </td>
                                                    : <></>
                                            }


                                        </tr>
                                    )


                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </>

    )
}

export default ViewAllSite