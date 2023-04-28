import logo from './logo.svg';
import './App.css';
import AddWorker from './components/AddWorker';
import NewSite from './components/NewSite';
import ViewAllWorker from './components/ViewAllWorker';
import AttendanceCard from './components/AttendanceCard';
import WorkerInformation from './components/WorkerInformation';
import ExtraInformation from './components/ExtraInformation';
import ViewWorker from './components/ViewWorker';
import ViewAllSite from './components/ViewAllSite';
import EditSite from './components/EditSite';
import EditWorker from './components/EditWorker';
import AttendanceSupervisor from './components/AttendanceSupervisor';
import AttendanceAdmin from './components/AttendanceAdmin';
import ReportMonthly from './components/ReportMonthly';
import Login from './components/Login';
import EditAttendance from './components/EditAttendance';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import Modal from './modals/Modal';
import Navbar from './components/Navbar';
import AttendanceDirect from './components/AttendanceDirect';
import ViewDailyAttendance from './components/ViewDailyAttendance';
import CashLabourAttendance from './components/CashLabourAttendance';
import ReportCashLabour from './components/ReportCashLabour';
import Testing1 from './components/Testing1';
import ReportDailySupervisor from './components/ReportDailySupervisor';
import ReportCashSupervisor from './components/ReportCashSupervisor';
import CashAttendanceSupervisor from './components/CashAttendanceSupervisor';
import EditCashLabour from './components/EditCashLabour';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='login' element={<Login />} />
            <Route path='testing' element={<Testing1 />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path='/' element={<ViewAllWorker />} />
                <Route path='addworker' element={<AddWorker />} />
                <Route path='editworker' element={<EditWorker />} />
                <Route path='viewworker' element={<ViewWorker />} />
                <Route path='viewextra' element={<ExtraInformation />} />
                <Route path='addsite' element={<NewSite />} />
                <Route path='editsite' element={<EditSite />} />
                <Route path='allsite' element={<ViewAllSite />} />
                <Route path='adminattendance' element={<AttendanceAdmin />} />
                <Route path='directattendance' element={<AttendanceDirect />} />
                <Route path='supervisorattendance' element={<AttendanceSupervisor />} />
                <Route path='editattendance' element={<EditAttendance />} />
                <Route path='report' element={<ReportMonthly />} />
                <Route path='navbar' element={<Navbar />} />

                <Route path='dailyattendance' element={<ViewDailyAttendance />} />
                <Route path='cashlabourreport' element={<ReportCashLabour />} />
                <Route path='cashattendanceadmin' element={<CashLabourAttendance />} />
                <Route path='editcash' element={<EditCashLabour />} />

                <Route path='cashattendancesupervisor' element={<CashAttendanceSupervisor />} />
                <Route path='reportdailysupervisor' element={<ReportDailySupervisor />} />
                <Route path='reportcashsupervisor' element={<ReportCashSupervisor />} />

              </Route>
            </Route>


          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
