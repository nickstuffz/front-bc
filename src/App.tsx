import "./App.css";
import * as React from "react";
import axios from "axios";
import ComboBox from "./components/ComboBox.tsx";
import CardManager from "./components/CardManager.tsx";

function App() {
  const [allCodes, setAllCodes] = React.useState([]);
  const [selectedCode, setSelectedCode] = React.useState("");

  // runs after initial render
  React.useEffect(() => {
    async function fetchAllCodes() {
      const response = await axios.get(
        "http://localhost:8080/api/components/codes",
      );
      setAllCodes(response.data);
      console.log("allCodes set");
    }
    fetchAllCodes();
  }, []);

  return (
    <>
      <ComboBox
        allCodes={allCodes}
        selectedCode={selectedCode}
        setSelectedCode={setSelectedCode}
      />
      <CardManager selectedCode={selectedCode} />
    </>
  );
}

export default App;
