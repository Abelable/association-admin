import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "screen/unauthenticated-app";
import { AuthenticatedApp } from "./screen/authenticated-app/index";
import "./App.css";

const App = () => {
  const { token } = useAuth();
  return (
    <div className="App">
      {token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
};

export default App;
