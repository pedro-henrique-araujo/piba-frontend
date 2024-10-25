import { useEffect, useState } from "react";
import { useApi } from "../../shared/useApi";
import { Table, DataTable } from "@primer/react/drafts";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import PibPagination from "../../components/PibPagination";
import infoLinkSvg from "../../assets/info-link.svg";

function ListSessionAttendance() {
  async function loadSessionAttendances() {
    try {
      const skip = (currentPage - 1) * pageSize;
      const {
        data: { total, records },
      } = await api.get(`/session-attendance?skip=${skip}&take=${pageSize}`);
      setSessionAttedances(records);
      setTotalNumberOfRecords(total);
    } catch {}
  }

  const api = useApi();
  const [sessionAttendances, setSessionAttedances] = useState([]);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    loadSessionAttendances();
  }, [currentPage, loadSessionAttendances]);

  return (
    <div className="mx-auto p-5 max-w-xl">
      <div className="mb-5 w-20">
        <PibPrimaryButton onClick={() => navigate("/frequencia/sessao/nova")}>
          Nova
        </PibPrimaryButton>
      </div>

      <Table.Container>
        <Table.Title>
          <div className="text-lg">Frequências de sessões</div>
        </Table.Title>
        <DataTable
          columns={[
            {
              field: "dateTime",
              header: () => <div className="text-base">Data</div>,
              renderCell({ dateTime }) {
                return (
                  <div className="text-base">
                    {new Date(dateTime).toLocaleDateString()}
                  </div>
                );
              },
            },
            {
              maxWidth: "50px",
              field: "id",
              header: "",
              renderCell({ id }) {
                return (
                  <Link to={"/frequencia/sessao/editar/" + id}>
                    <img src={infoLinkSvg} alt="Informação" />
                  </Link>
                );
              },
            },
          ]}
          data={sessionAttendances}
        />
      </Table.Container>
      <div className="mt-10">
        <PibPagination
          currentPage={currentPage}
          switchToPreviousPage={() => setCurrentPage(currentPage - 1)}
          switchToNextPage={() => setCurrentPage(currentPage + 1)}
          totalNumberOfPages={Math.ceil(totalNumberOfRecords / pageSize)}
        />
      </div>
    </div>
  );
}

export default ListSessionAttendance;
