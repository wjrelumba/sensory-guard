import { createBrowserRouter } from "react-router-dom";
import Pages, { AccountPages, DashboardPages, HistoryPages, TestPages } from "../pages";

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
  element: <AccountPages.ActivationPage/>
},
{
  path: '/newlyActivated',
  element: <AccountPages.NewlyActivatedPage/>
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
    element: <AccountPages.IndividualAccount/>,
    children: [{
      path: '',
      element: <AccountPages.IndividualAccountHome/>,
    },{
      path: 'edit',
      element: <AccountPages.EditAccount/>,
    }]
  },{
    path: 'viewReport',
    element: <HistoryPages.ViewReport/>
  },{
    path: 'accountQR',
    element: <AccountPages.AccountQR/>
  }]
},
// {
//   path: '/test',
//   children: [{
//     path: 'dashboard',
//     element: <TestPages.TestDashboard/>
//   }]
// }
]);

export default router;