import PibPagination from "./PibPagination";
import { Table, DataTable } from "@primer/react/drafts";
import usePagination from "../shared/usePagination";

import { Link } from "react-router-dom";

function PibTable({ path, columns, title }) {
  const pagination = usePagination(path);

  return (
    <>
      <Table.Container>
        <Table.Title>
          <div className="text-lg">{title}</div>
        </Table.Title>
        <DataTable columns={columns} data={pagination.records} />
      </Table.Container>
      <div className="mt-10">
        <PibPagination
          currentPage={pagination.currentPage}
          switchToPreviousPage={pagination.switchToPreviousPage}
          switchToNextPage={pagination.switchToNextPage}
          totalNumberOfPages={pagination.totalNumberOfPages()}
        />
      </div>
    </>
  );
}

export default PibTable;
