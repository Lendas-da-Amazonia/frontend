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
const ListUsers = lazy(() => import("../pages/Users/List"));

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
