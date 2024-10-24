import { useEffect, useState } from "react";
import { useApi } from "../../shared/useApi";
import { Table, DataTable } from "@primer/react/drafts";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import { Link, useNavigate } from "react-router-dom";

function ListSessionAttendance() {
  async function loadSessionAttendances() {
    try {
      const {
        data: { records },
      } = await api.get("/session-attendance");
      setSessionAttedances(records);
    } catch {}
  }

  useEffect(() => {
    loadSessionAttendances();
  }, []);

  const api = useApi();
  const [sessionAttendances, setSessionAttedances] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="mx-auto p-5 max-w-xl">
      <div className="mb-5 w-20">
        <PibPrimaryButton onClick={() => navigate("/frequencia/sessao/nova")}>
          Nova
        </PibPrimaryButton>
      </div>

      <Table.Container>
        <Table.Title>Frequências de sessões</Table.Title>
        <DataTable
          columns={[
            {
              field: "dateTime",
              header: "Data",
              renderCell({ dateTime }) {
                return new Date(dateTime).toLocaleDateString();
              },
            },
            {
              field: "id",
              header: "",
              renderCell({ id }) {
                return (
                  <Link to={"/frequencia/sessao/editar/" + id}>Editar</Link>
                );
              },
            },
          ]}
          data={sessionAttendances}
        />
      </Table.Container>
    </div>
  );
}

export default ListSessionAttendance;
