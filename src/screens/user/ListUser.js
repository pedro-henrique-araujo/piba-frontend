import PibTable from "../../components/PibTable";
import { Link } from "react-router-dom";
import infoLinkSvg from "../../assets/info-link.svg";
import { useNavigate } from "react-router-dom";
import PibBlankButton from "../../components/PibBlankButton";

function ListUser() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto p-5 max-w-xl">
      <div className="mb-5 w-20">
        <PibBlankButton onClick={() => navigate("/menu")}>Menu</PibBlankButton>
      </div>
      <PibTable
        title="Usuários"
        path="user"
        columns={[
          {
            field: "name",
            header: () => <div className="text-base">Nome</div>,
            renderCell({ name }) {
              return <div className="text-base">{name}</div>;
            },
          },
          {
            maxWidth: "50px",
            field: "id",
            header: "",
            renderCell({ id }) {
              return (
                <Link to={"/usuario/" + id}>
                  <img src={infoLinkSvg} alt="Informação" />
                </Link>
              );
            },
          },
        ]}
      />
    </div>
  );
}

export default ListUser;
