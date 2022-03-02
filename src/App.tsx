import { useState } from "react";
import { UnauthenticatedApp } from "screen/unauthenticated-app";
import { AuthenticatedApp } from "./screen/authenticated-app/index";

import "./App.css";

const App = () => {
  const [auth] = useState(false);

  return (
    <div className="App">
      {auth ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
};

export default App;
