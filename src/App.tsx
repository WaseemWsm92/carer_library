import "./App.css";
import { useRoutes } from "react-router-dom";

import { routes } from "./routes";

function App() {
  const pages = useRoutes(routes);
  return <div className="App">{pages}</div>;
}

export default App;
