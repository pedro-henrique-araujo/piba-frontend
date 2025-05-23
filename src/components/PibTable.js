import PibPagination from "./PibPagination";
import { Table, DataTable } from "@primer/react/drafts";
import usePagination from "../shared/usePagination";

import PibLoading from "./PibLoading";

function PibTable({ path, columns, title }) {
  const pagination = usePagination(path);

  if (pagination.loading)
    return (
      <div className="flex justify-center">
        <PibLoading />
      </div>
    );

  return (
    <>
      <Table.Container>
        <Table.Title>
          <div className="text-lg">{title}</div>
        </Table.Title>
        <br />
        {pagination?.records?.length === 0 ? (
          <div className="mt-5">Ainda não há registros para exibir</div>
        ) : (
          <DataTable columns={columns} data={pagination.records} />
        )}
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
