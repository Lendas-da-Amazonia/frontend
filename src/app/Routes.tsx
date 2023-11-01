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
import { LayoutNavbar } from "@/layouts/LayoutNavBar"

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
                <Route
                  path="/"
                  element={
                    <LayoutNavbar>
                      <LegendList />
                    </LayoutNavbar>
                  }
                />
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

              <Route
                path="/about_us"
                element={
                  <LayoutNavbar>
                    <div className="bg-slate-950 text-white h-full w-full flex justify-center py-10">
                      <div className="flex flex-col max-w-2xl">
                        <h1 className="text-3xl font-medium">Sobre nós</h1>
                        <p className="mt-10">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </p>
                      </div>
                    </div>
                  </LayoutNavbar>
                }
              />

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

              {status === "authenticated" && (
                <Route
                  path="/edit_legend/:id"
                  element={
                    <LayoutSidebar>
                      <Create />
                    </LayoutSidebar>
                  }
                />
              )}

              {status === "not_authenticated" && (
                <Route
                  path="/legends/:id"
                  element={
                    <LayoutNavbar>
                      <Legend />
                    </LayoutNavbar>
                  }
                />
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
                  path="/perfil/:id"
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
