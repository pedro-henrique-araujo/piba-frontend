import { useState, useEffect } from "react";
import { useApi } from "../../shared/useApi";
import { useNavigate, useParams } from "react-router-dom";

export function Choose() {
  async function load() {
    const {
      data: { records },
    } = await api.get("song?search=" + search);
    setSongs(records);
  }

  async function choose(s) {
    if (id) {
      await api.patch(`schedule/${id}/song/${s.id}`);
      navigate("/schedule/" + id);
      return;
    }
    const { data } = await api.post("schedule/" + s.id);
    navigate("/schedule/" + data.id);
  }

  const [songs, setSongs] = useState([]);
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const api = useApi();
  useEffect(() => {
    load();
  }, []);
  return (
    <div>
      <input
        placeholder="Pesquise..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={load}>Pesquisar</button>
      <div>
        {songs.map((s) => (
          <div onClick={() => choose(s)}>{s.name}</div>
        ))}
      </div>
    </div>
  );
}
