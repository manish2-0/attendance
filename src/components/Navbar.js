import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import logo from '../logo.png';
// import SearchContext from '../context/SearchContext'
import { useContext } from 'react';
import Loader from './Loader';
import Modal from '../modals/Modal';
import useModal from '../hooks/useModal';
import 'tw-elements';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import api from './axiosapi';
import useAuth from '../hooks/useAuth';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Navbar() {

    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const [loading, setloading] = useState(false);

    // const { setauth, setadminname } = useAuth();

    const { setauth, adminname, setadminname } = useAuth();

    const nav = useNavigate();


    const handlelogout = async (e) => {
        setloading(true);
        e.preventDefault();

        try {
            await api.post('admin/logout').then(function (response) {
                localStorage.removeItem("admin_id");
                localStorage.removeItem("role");
                setloading(false)
                setauth({});
                setadminname("");
                setmodal(true);
                setmodalmessage({
                    "text1": "Success",
                    "text2": "Logged out successfully"
                });
                nav("/login", { replace: true });
            })

        } catch (error) {
            setloading(false)
            setmodal(true);
            setmodalmessage({
                "text1": "Error",
                "text2": "No server response."
            });
        }


    }


    const imageclicked = () => {
        nav("/");
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

            <div className='z-50' id='navbarprivate'>
                <div className="transition translate-y-0 z-30 bg-fix fixed w-full" id='main'>
                    <div className='sm:container relative w-full p-2 px-3 mx-auto bg-fix sm:translate-y-0'>

                        <div className='flex justify-between h-1/2 sm:h-auto'>

                            {/* Navicon */}
                            <div className='flex items-center order-1 w-1/4 lg:ml-2'>
                                <img onClick={imageclicked} className='w-16 h-16 cursor-pointer' alt="" srcSet={logo} />
                            </div>


                            {/* Person Logo */}

                            <div className='relative flex items-center justify-end order-3 w-1/4 lg:mr-2'>


                                {
                                    localStorage.getItem("role") == "Admin"
                                        ? <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex items-center justify-center w-full px-2 py-2 text-base font-medium text-white bg-transparent rounded-md hover:text-slate-300 focus:outline-none">
                                                    Welcome,{localStorage.getItem("admin_id")}
                                                    <ChevronDownIcon className="w-6 h-6 my-auto ml-1" aria-hidden="true" />
                                                </Menu.Button>
                                            </div>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1">

                                                        <form>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        All Workers
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/addworker"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Add Worker
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/adminattendance"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Add Attendance
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/cashattendanceadmin"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Cash Labour Attendance
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/addsite"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Add Site
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/allsite"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        All Site
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/report"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Generate Report
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/cashlabourreport"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Cash Labour Report
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/reportsite"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Site Report
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button onClick={handlelogout}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Logout
                                                                    </button>
                                                                )}
                                                            </Menu.Item>


                                                        </form>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                        : <></>
                                }
                                {
                                    localStorage.getItem("role") == "Supervisor"
                                        ? <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex items-center justify-center w-full px-2 py-2 text-base font-medium text-white bg-transparent rounded-md hover:text-slate-300 focus:outline-none">
                                                    Welcome,{localStorage.getItem("admin_id")}
                                                    <ChevronDownIcon className="w-6 h-6 my-auto ml-1" aria-hidden="true" />
                                                </Menu.Button>
                                            </div>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1">

                                                        <form>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        All Workers
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/supervisorattendance"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Add Attendance
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/cashattendancesupervisor"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Cash Labour Attendance
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/reportdailysupervisor"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        View Daily Attendance
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/reportcashsupervisor"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        View Cash Labour Attendance
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>


                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to="/allsite"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        All Site
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button onClick={handlelogout}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-center'
                                                                        )}
                                                                    >
                                                                        Logout
                                                                    </button>
                                                                )}
                                                            </Menu.Item>


                                                        </form>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                        : <></>
                                }


                            </div>


                        </div>


                    </div>



                </div >
            </div >
        </>

    )
}

export default Navbar