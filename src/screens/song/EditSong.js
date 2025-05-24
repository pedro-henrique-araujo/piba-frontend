import PibBlankButton from "../../components/PibBlankButton";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import { useNavigate } from "react-router-dom";
import chevronLeftLink from "../../assets/chevron-left-link.svg";
import { useEffect, useState } from "react";
import { useApi } from "../../shared/useApi";
import { useParams } from "react-router-dom";

function EditSong() {
  async function save() {
    await api.put("/song", { id, name });
    navigate("/musica");
  }

  async function loadData() {
    const { data } = await api.get("/song/" + id);
    setName(data.name);
  }

  useEffect(() => {
    loadData();
  }, []);
  const api = useApi();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { id } = useParams();
  return (
    <div className="mx-auto p-5 max-w-xl">
      <div className="mb-5 w-20 flex w-full">
        <div className="w-20">
          <PibBlankButton onClick={() => navigate("/frequencia/sessao")}>
            <div className="flex">
              <img src={chevronLeftLink} alt="<" />
              <span>Voltar</span>
            </div>
          </PibBlankButton>
        </div>
        <div className="w-20">
          <PibPrimaryButton disabled={!name} onClick={save}>
            Salvar
          </PibPrimaryButton>
        </div>
      </div>
      <div>
        <label className="font-bold">Nome</label>
      </div>
      <div className="mt-1 mb-3">
        <input
          className="h-9 w-3/4 px-3 border border-gray-300 rounded rounded-lg shadow-sm bg-white"
          type="text"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </div>
    </div>
  );
}

export default EditSong;
