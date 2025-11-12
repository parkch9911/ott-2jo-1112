import { createContext, useState } from "react";
import { fetchAll } from "./useFetch";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [allData, setAllData] = useState([]);

  // 전체 fetch + 상태 업데이트
  const fetchAllEndpoints = () => {
    fetchAll().then((data) => setAllData(data));
  };

  return (
    <DataContext.Provider value={{ allData, fetchAllEndpoints }}>
      {children}
    </DataContext.Provider>
  );
}
