import { Link } from "react-router-dom";
import infoLinkSvg from "../../assets/info-link.svg";
import PibTable from "../../components/PibTable";

function ListSong() {
  return (
    <div className="mx-auto p-5 max-w-xl">
      <PibTable
        title="Músicas"
        path="song"
        columns={[
          {
            field: "name",
            header: () => <div className="text-base">Nome</div>,
            renderCell({ name }) {
              return <div className="text-base">{name}</div>;
            },
          },
          {
            field: "id",
            header: "",
            maxWidth: "50px",
            renderCell({ id }) {
              return (
                <Link to={`/musica/${id}`}>
                  <img
                    src={infoLinkSvg}
                    alt="Detalhes"
                    className="w-5 h-5 cursor-pointer"
                  />
                </Link>
              );
            },
          },
        ]}
      />
    </div>
  );
}

export default ListSong;
