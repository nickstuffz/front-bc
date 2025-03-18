import "./App.css";
import * as React from "react";
import axios from "axios";
import ComboBox from "./components/ComboBox.tsx";
import GroupManager from "./components/GroupManager.tsx";

function App() {
  const [allCodes, setAllCodes] = React.useState([]);
  const [selectedCode, setSelectedCode] = React.useState("ST-RX400");

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
    <main className="main">
      <ComboBox
        allCodes={allCodes}
        selectedCode={selectedCode}
        setSelectedCode={setSelectedCode}
      />
      <GroupManager selectedCode={selectedCode} />
    </main>
  );
}

export default App;
