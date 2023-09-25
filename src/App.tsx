import { AuthProvider } from "./app/ContextAuth";
import { UsersProvider } from "./app/ContextUsers";
import AppRoutes from "./app/Routes";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <AuthProvider>
        <UsersProvider>
          <AppRoutes />
        </UsersProvider>
      </AuthProvider>
    </>
  );
}

export default App;
