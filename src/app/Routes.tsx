import { lazy, Suspense } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoadingScreen } from "../layouts/LoadingScreen";
import { Loading } from "../layouts/Loading";
import { LayoutSidebar } from "../layouts/LayoutSidebar";
import { useAuth } from "./ContextAuth";

const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const ListUsers = lazy(() => import("../pages/Users/List"));
const Legend = lazy(() => import("../pages/Legend/Post"));
const Create = lazy(() => import("../pages/Legend/Create"));
const LegendList = lazy(() => import("../pages/Legend/List"));

const AppRoutes = () => {
  const { status } = useAuth();

  return (
    <>
      {status === "loading" ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Suspense
            fallback={
              status === "authenticated" ? (
                <LayoutSidebar>
                  <Loading />
                </LayoutSidebar>
              ) : (
                <Loading />
              )
            }
          >
            <Routes>
              <Route path="*" element={<Navigate to="/login" />} />

              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />

              <Route path="/create_legend" element={<Create />} />

              <Route path="/legends/:id" element={<Legend/>}/>

              <Route path="/legends" element={<LegendList/>}/>

              <Route
                path="/users"
                element={
                  <LayoutSidebar>
                    <ListUsers />
                  </LayoutSidebar>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      )}
    </>
  );
};

export default AppRoutes;
