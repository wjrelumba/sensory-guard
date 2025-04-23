import { createBrowserRouter } from "react-router-dom";
import Pages, { DashboardPages, TestPages } from "../pages";

const router = createBrowserRouter([{
  path: '/',
  element: <Pages.Homepage/>
},
{
  path: '/testingPage',
  element: <TestPages.TestingPage/>
},
{
  path: '/login',
  element: <Pages.Login/>
},
{
  path: '/signup',
  element: <Pages.Signup/>
},
{
  path: '/dashboard',
  element: <Pages.Dashboard/>,
  children: [{
    path: '',
    element: <DashboardPages.DashboardSensors/>
  },{
    path: 'prototype',
    element: <Pages.IndividualPrototype/>
  },{
    path: 'control',
    element: <Pages.Control/>,
  },{
    path: 'history',
    element: <Pages.History/>,
  },{
    path: 'accounts',
    element: <Pages.Accounts/>,
  },{
    path: 'settings',
    element: <Pages.Settings/>
  },{
    path: 'individualAcc',
    element: <Pages.IndividualAccount/>
  }]
},
{
  path: '/test',
  children: [{
    path: 'dashboard',
    element: <TestPages.TestDashboard/>
  }]
}]);

export default router;