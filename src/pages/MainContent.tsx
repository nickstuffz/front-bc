import * as React from "react";
import axios from "axios";
import CommandSearch from "@/components/CommandSearch.tsx";
import GroupManager from "@/components/GroupManager.tsx";

function MainContent() {
  const [allCodes, setAllCodes] = React.useState([]);
  const [selectedCodes, setSelectedCodes] = React.useState<string[]>([]);

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
      <CommandSearch
        allCodes={allCodes}
        selectedCodes={selectedCodes}
        setSelectedCodes={setSelectedCodes}
      />
      {selectedCodes.map((selectedCode) => (
        <p>{selectedCode}</p>
      ))}
      {/* <GroupManager selectedCodes={selectedCodes} /> */}
    </>
  );
}

export default MainContent;
