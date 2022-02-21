import { auth } from "firebase";
import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";
import { ROUTES } from "./js/constants";
import Appointments from "./Views/appointments/Appointments";
import Dashboard from "./Views/dashboard/Dashboard";
import Patients from "./Views/patients/patients";
import Diagnosis from "./Views/diagnosis/Diagnosis";
import Transactions from "./Views/transactions/Transactions";
import Welcome from "./welcome";
import Patient from "./Views/patients/patient";
import CreatePrescription from "./Views/perscriptions/create-prescriptions";
import Login_here from "./Views/login/login";
import Signinout from "./Views/login/login_signup";
import CreateTransaction from "./Views/transactions/CreateTransaction";
import CreateTransaction_PatientsTable from "./Views/transactions/CreateTransaction-PatientsTable";
import Employees from "./Views/employees/employees";
import CreateEmployees from "./Views/employees/create-employee";
import CreateAppointments from "./Views/appointments/create-appointment";
import Prescriptions from "./Views/perscriptions/Prescriptions"
import PrescriptionTable from "./Views/perscriptions/prescription-table";
import PatientsTable from "./Views/perscriptions/patients-table";

export default function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Welcome />} />
          {/* <Route path={ROUTES.LOGIN} element={<Layout2 />} /> */}
          {/* <Route path={ROUTES.DASHBOARD} element={AuthRoute(<Dashboard />)} />
          <Route path={ROUTES.APPOINTMENTS} element={AuthRoute(<Appointments />)} /> */}
          <Route path={ROUTES.DASHBOARD} element={<Dashboard> <Patients /> </Dashboard>} />
          <Route path={ROUTES.APPOINTMENTS} element={<Appointments />} />
          <Route path={ROUTES.CREATE_APPOINTMENT} element={<CreateAppointments />} />
          <Route path={ROUTES.DIAGNOSIS} element={<Diagnosis />} />
          <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
          <Route path={ROUTES.LOGIN} element={<Login_here />} />
          <Route path={ROUTES.LOGIN_SIGNUP} element={<Signinout />} />
          <Route path={ROUTES.PATIENTS} element={<Dashboard> <Patients /> </Dashboard>} />

          <Route path={ROUTES.PATIENTS_TABLE} element={<PatientsTable />} />
          <Route path={ROUTES.EMPLOYEES} element={<Dashboard> <Employees /> </Dashboard>} />
          <Route path={ROUTES.ADD_PRESCRIPTION} element={<CreatePrescription />} />
          <Route path={ROUTES.PRESCRIPTIONS} element={<Prescriptions />} />
          <Route path={ROUTES.PRESCRIPTION_TABLE} element={<PrescriptionTable />} />
          <Route path={ROUTES.CREATE_EMPLOYEE} element={<CreateEmployees />} />
          <Route path={ROUTES.CREATE_TRANSACTION} element={<CreateTransaction />} />
          <Route path={ROUTES.CREATE_TRANSACTION_PATIENTS_TABLE} element={<CreateTransaction_PatientsTable />} />

        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  const navigate = useNavigate();
  //React.useEffect(() => setTimeout(() => navigate(ROUTES.LOGIN), 200), [])
  return (<div> <Outlet /> </div>);
}
const AuthContext = React.createContext({ user: null });
const AuthProvider = ({ children }) => <AuthContext.Provider value={{ user: auth().currentUser }}>{children}</AuthContext.Provider>;
const useAuth = () => React.useContext(AuthContext);
const AuthenticateRoute = ({ children }) => {
  const user = auth().currentUser
  const navigate = useNavigate();

  if (user) return <Dashboard>{children}</Dashboard>
  else navigate(ROUTES.LOGIN_SIGNUP)
}



function Layout2() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>

          </li>
          <li>
            <Link to={ROUTES.APPOINTMENTS}>Appointments</Link>
          </li>
          <li>
            <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
          </li>
          <li>
            <Link to={ROUTES.PRESCRIPTIONS}>Prescriptions</Link>
          </li>
          <li>
            <Link to={ROUTES.DIAGNOSIS}>Diagnosis</Link>
          </li>
          <li>
            <Link to={ROUTES.TRANSACTIONS}>Transactions</Link>
          </li>

        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
