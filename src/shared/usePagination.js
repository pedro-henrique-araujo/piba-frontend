import { useEffect, useState } from "react";
import { useApi } from "../shared/useApi";

function usePagination(path) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
  const api = useApi();

  function switchToNextPage() {
    setCurrentPage((prev) => prev + 1);
  }

  function switchToPreviousPage() {
    setCurrentPage((prev) => prev - 1);
  }

  function totalNumberOfPages() {
    return Math.ceil(totalNumberOfRecords / pageSize);
  }

  async function loadData() {
    const skip = (currentPage - 1) * pageSize;
    const {
      data: { total, records },
    } = await api.get(`/${path}?skip=${skip}&take=${pageSize}`);
    setRecords(records);
    setTotalNumberOfRecords(total);
  }

  useEffect(() => {
    loadData();
  }, [currentPage]);

  return {
    records,
    totalNumberOfRecords,
    currentPage,
    pageSize,
    switchToNextPage,
    switchToPreviousPage,
    loadData,
    totalNumberOfPages,
  };
}

export default usePagination;
