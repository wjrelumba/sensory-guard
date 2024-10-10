import DashboardSensors from "./components/DashboardSensors/DashboardSensors";
import TestDashboard from "./components/testing/TestDashboard";
import Dashboard from "./Pages/Dashboard";
import Homepage from "./Pages/Homepage";
import IndividualPrototype from "./Pages/IndividualPrototype";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";

export const Pages = {
    Homepage,
    Login,
    NotFound,
    Signup,
    Dashboard,
    IndividualPrototype,
}

export const DashboardPages = {
    DashboardSensors,
}

export const TestPages = {
    TestDashboard,
}

export default Pages;