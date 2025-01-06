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

export const DashboardPages = {
    DashboardSensors,
}

export const TestPages = {
    TestDashboard,
}

export default Pages;