import React, { useEffect } from 'react'
import WorkerInformation from './WorkerInformation'
import AttendanceCard from './AttendanceCard'
import useSearch from '../hooks/useSearch';
import { useLocation } from 'react-router-dom';

const ViewWorker = () => {

    const { data, setdata, attendance, setattendance, attendance2, setattendance2 } = useSearch();

    const location = useLocation();
    const { values } = location.state;

    useEffect(() => {
        setattendance([]);
        setdata({
            "er_no": "-",
            "month": "-",
            "year": "-"
        });
        setattendance2([]);
    }, []);



    return (
        <div id='workercard' className='p-2 pt-20 max-w-[1000px] mx-auto'>
            <WorkerInformation user={values} />
            {
                attendance.length != 0
                    ? <AttendanceCard user={values} />
                    : <>
                        <span className='w-full block border mb-2'></span>
                        {
                            data.month == "-" || data.year == "-"
                                ? <div className="w-full">
                                    Please select Month and Year and click "Get"
                                </div>
                                : <>
                                    <p className='text-fix'>Attendance for: {data.month},{data.year}</p>
                                    <div className="w-full">
                                        No data found
                                    </div>
                                </>
                        }


                    </>
            }

        </div >
    )
}

export default ViewWorker