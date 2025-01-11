import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useMode } from "./context/ModeContext";  // Import useMode dari ModeContext
import { AuthContext } from "./context/authContext";
import SignInPage from "./pages/signIn";
import SignUpPage from "./pages/signUp";
import ErrorRoute from "./pages/errorRoute";
import ForgotPasswordPage from "./pages/forgotPassword";
import DashboardPage from "./pages/dashboard";
import BalancePage from "./pages/balance";
import GoalPage from "./pages/goal";
import ExpensePage from "./pages/expense";
import Main_Menu from "./pages/main_menu";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <RequireAuth><DashboardPage /></RequireAuth>,
      errorElement: <ErrorRoute />,
    },
    {
      path: "/main",
      element: <Main_Menu />,
    },
    {
      path: "/login",
      element: <SignInPage />,
    },
    {
      path: "/register",
      element: <SignUpPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/balance",
      element: <RequireAuth><BalancePage /></RequireAuth>,
    },
    {
      path: "/goal",
      element: <RequireAuth><GoalPage /></RequireAuth>,
    },
    {
      path: "/expense",
      element: <RequireAuth><ExpensePage /></RequireAuth>,
    },
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
};

export default App;
