import { createBrowserRouter } from "react-router-dom";
import Pages, { DashboardPages, HistoryPages, TestPages } from "../pages";

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
  path: '/activation',
  element: <Pages.ActivationPage/>
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
  },{
    path: 'viewReport',
    element: <HistoryPages.ViewReport/>
  },{
    path: 'accountQR',
    element: <Pages.AccountQR/>
  },{
    path: 'newlyActivated',
    element: <Pages.NewlyActivatedPage/>
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