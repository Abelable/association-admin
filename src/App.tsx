import { useAuth } from "context/auth-context";
import { LoginScreen } from "screen/login";
import { AuthenticatedApp } from "./screen/authenticated-app/index";
import "./App.css";
import { FullPageErrorFallback } from "components/lib";
import { ErrorBoundary } from "components/error-boundary";

const App = () => {
  const { token } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {token ? <AuthenticatedApp /> : <LoginScreen />}
      </ErrorBoundary>
    </div>
  );
};

export default App;
