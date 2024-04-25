import { useContext } from "react";
import "./App.css";
import { DataContext } from "./context/AppData";

function App() {
  const { singleObj } = useContext(DataContext);

  return <>{singleObj}</>;
}

export default App;
