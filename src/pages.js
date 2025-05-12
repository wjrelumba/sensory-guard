import DashboardSensors from "./components/DashboardSensors/DashboardSensors";
import TestDashboard from "./components/testing/TestDashboard";
import Control from "./Pages/DashboardPages/Control";
import Dashboard from "./Pages/Dashboard";
import Homepage from "./Pages/Homepage";
import IndividualPrototype from "./Pages/IndividualPrototype";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import History from "./Pages/DashboardPages/History";
import Accounts from "./Pages/DashboardPages/Accounts";
import Settings from "./Pages/DashboardPages/Settings";
import TestingPage from "./TestingPage/TestingPage";
import IndividualAccount from "./Pages/AccountsPages/IndividualAccount";
import ViewReport from "./Pages/DashboardPages/HistoryPages/ViewReport";
import ActivationPage from "./Pages/ActivationPage";
import AccountQR from "./Pages/AccountsPages/AccountQR";
import NewlyActivatedPage from "./Pages/DashboardPages/NewlyActivatedPage";
import EditAccount from "./Pages/AccountsPages/EditAccount";
import IndividualAccountHome from "./Pages/AccountsPages/IndividualAccountHome";

export const Pages = {
    Homepage,
    Login,
    NotFound,
    Signup,
    Dashboard,
    IndividualPrototype,
    Control,
    History,
    Accounts,
    Settings,
}

export const HistoryPages = {
    ViewReport,
}

export const DashboardPages = {
    DashboardSensors,
}

export const AccountPages = {
    ActivationPage,
    AccountQR,
    NewlyActivatedPage,
    IndividualAccount,
    EditAccount,
    IndividualAccountHome,
}

export const TestPages = {
    TestDashboard,
    TestingPage,
}

export default Pages;