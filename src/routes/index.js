import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Make sure to import BrowserRouter and Routes

import PrivateRoute from './PrivateRoutes';
import CreateUser from '../pages/CreateUser';
import MainDashboard from '../pages/Dashboard/MainDashboard';
import NewReservation from '../pages/Reservations/AddReservation';
import AddRoom from '../pages/Rooms/AddRoom';
import ListRooms from '../pages/Rooms/ListRooms';
import AvailabilityList from '../pages/Availability/AvailabilityList';
import Login from '../pages/Login';
import AccountDashboard from '../pages/Account/AccountDashboard';
import ReportDashboard from '../pages/Reports/ReportDashboard';

const Navigation = () => {
  // ... Your existing code ...

  return (
    <div className="wrapper">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              {/* COMMON ROUTES */}
              <Route path="/" element={<Login />} />
              <Route path="/createuser" element={<CreateUser />} />

              <PrivateRoute path="/dashboard" element={<MainDashboard />} />
              <PrivateRoute path="/reservation" element={<NewReservation />} />
              <PrivateRoute path="/add-room" element={<AddRoom />} />
              <PrivateRoute path="/rooms" element={<ListRooms />} />
              <PrivateRoute path="/availability" element={<AvailabilityList />} />
              <PrivateRoute path="/account" element={<AccountDashboard />} />
              <PrivateRoute path="/reports" element={<ReportDashboard />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default Navigation;
