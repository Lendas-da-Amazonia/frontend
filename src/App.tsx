import { AuthProvider } from "./app/ContextAuth";
import { UsersProvider } from "./app/ContextUsers";
import AppRoutes from "./app/Routes";

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <AppRoutes />
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
