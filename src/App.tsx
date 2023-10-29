import { AuthProvider } from "./app/ContextAuth"
import { MythsProvider } from "./app/ContextMyths"
import { UsersProvider } from "./app/ContextUsers"
import AppRoutes from "./app/Routes"

import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <ToastContainer
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <AuthProvider>
        <MythsProvider>
          <UsersProvider>
            <AppRoutes />
          </UsersProvider>
        </MythsProvider>
      </AuthProvider>
    </>
  )
}

export default App
