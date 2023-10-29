import { lazy, Suspense } from "react"

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import { LayoutSidebar } from "../layouts/LayoutSidebar"
import { Loading } from "../layouts/Loading"
import { LoadingScreen } from "../layouts/LoadingScreen"
import { useAuth } from "./ContextAuth"

const Login = lazy(() => import("../pages/Login"))
const Signup = lazy(() => import("../pages/Signup"))
const ListUsers = lazy(() => import("../pages/Users/List"))
const Legend = lazy(() => import("../pages/Legend/Post"))
const Create = lazy(() => import("../pages/Legend/Create"))
const LegendList = lazy(() => import("../pages/Legend/List"))
const MyLegendList = lazy(() => import("../pages/Legend/MyList"))

const AppRoutes = () => {
  const { status } = useAuth()

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
              <Route path="*" element={<Navigate to="/" />} />

              {status === "not_authenticated" && (
                <Route path="/" element={<LegendList />} />
              )}

              {status === "authenticated" && (
                <Route
                  path="/"
                  element={
                    <LayoutSidebar>
                      <LegendList />
                    </LayoutSidebar>
                  }
                />
              )}

              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />

              {status === "authenticated" && (
                <Route
                  path="/create_legend"
                  element={
                    <LayoutSidebar>
                      <Create />
                    </LayoutSidebar>
                  }
                />
              )}

              {status === "not_authenticated" && (
                <Route path="/legends/:id" element={<Legend />} />
              )}

              {status === "authenticated" && (
                <Route
                  path="/legends/:id"
                  element={
                    <LayoutSidebar>
                      <Legend />
                    </LayoutSidebar>
                  }
                />
              )}

              {status === "authenticated" && (
                <Route
                  path="/users"
                  element={
                    <LayoutSidebar>
                      <ListUsers />
                    </LayoutSidebar>
                  }
                />
              )}

              {status === "authenticated" && (
                <Route
                  path="/perfil"
                  element={
                    <LayoutSidebar>
                      <MyLegendList />
                    </LayoutSidebar>
                  }
                />
              )}
            </Routes>
          </Suspense>
        </Router>
      )}
    </>
  )
}

export default AppRoutes
