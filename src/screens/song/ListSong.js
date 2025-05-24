import { Link } from "react-router-dom";
import infoLinkSvg from "../../assets/info-link.svg";
import PibTable from "../../components/PibTable";
import { useNavigate } from "react-router-dom";
import PibBlankButton from "../../components/PibBlankButton";
import PibPrimaryButton from "../../components/PibPrimaryButton";

function ListSong() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto p-5 max-w-xl">
      <div className="mb-5 w-20">
        <PibBlankButton onClick={() => navigate("/menu")}>Menu</PibBlankButton>
      </div>
      <div className="mb-5 w-20">
        <PibPrimaryButton onClick={() => navigate("/musica/nova")}>
          Nova
        </PibPrimaryButton>
      </div>
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
