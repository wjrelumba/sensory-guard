import { createBrowserRouter } from "react-router-dom";
import Pages, { TestPages } from "../pages";

const router = createBrowserRouter([{
  path: '/',
  element: <Pages.Homepage/>
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
  element: <Pages.Dashboard/>
},
{
  path: '/test',
  children: [{
    path: 'dashboard',
    element: <TestPages.TestDashboard/>
  }]
}]);

export default router;