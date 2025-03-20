import * as React from "react";
import axios from "axios";
import ComboBox from "../components/ComboBox.tsx";
import GroupManager from "../components/GroupManager.tsx";

function MainContent() {
  const [allCodes, setAllCodes] = React.useState([]);
  const [selectedCode, setSelectedCode] = React.useState("ST-RX400");

  // runs after initial render
  React.useEffect(() => {
    async function fetchAllCodes() {
      const response = await axios.get(
        "http://localhost:8080/api/components/codes",
      );
      setAllCodes(response.data);
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
      <GroupManager selectedCode={selectedCode} />
    </>
  );
}

export default MainContent;
