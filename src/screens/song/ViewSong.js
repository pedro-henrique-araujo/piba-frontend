import { useApi } from "../../shared/useApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import chevronLeftLink from "../../assets/chevron-left-link.svg";
import { useNavigate } from "react-router-dom";
import PibBlankButton from "../../components/PibBlankButton";

function ViewSong() {
  async function loadData() {
    const { data } = await api.get("/song/" + id);
    setSong(data);
  }
  const [song, setSong] = useState(null);
  const { id } = useParams();
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="mx-auto p-5 max-w-xl">
      <div className="w-20">
        <PibBlankButton onClick={() => navigate("/musica")}>
          <div className="flex">
            <img src={chevronLeftLink} />
            <span>Voltar</span>
          </div>
        </PibBlankButton>
      </div>
      <div>
        <strong>Nome: </strong>
        {song?.name}
      </div>
    </div>
  );
}

export default ViewSong;
