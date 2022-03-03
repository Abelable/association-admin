import { useAuth } from "context/auth-context";
import { LoginScreen } from "screen/login";
import { AuthenticatedApp } from "./screen/authenticated-app/index";
import "./App.css";

const App = () => {
  const { token } = useAuth();
  return (
    <div className="App">{token ? <AuthenticatedApp /> : <LoginScreen />}</div>
  );
};

export default App;
