import { useEffect, useState } from "react";
import { useApi } from "../../shared/useApi";
import { Link, useParams } from "react-router-dom";

export function Schedule() {
  async function load() {
    if (!id) return;
    const {
      data: { scheduleSongs },
    } = await api.get("schedule/" + id);
    setSelected(scheduleSongs);
  }

  async function removeSong(schedule) {
    await api.patch(`schedule/${id}/song/${schedule.song.id}/remove`);
    await load();
  }

  const api = useApi();
  const [selected, setSelected] = useState([]);
  const { id = null } = useParams();
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <input type="date" value="2025-12-25" />
      <Link to={"/schedule/choose/" + id}>Adicionar música</Link>
      <div className="border">
        {selected?.length == 0
          ? "Nenhuma música adicionada até o momento"
          : selected.map((s) => (
              <div className="flex gap-5">
                <div>{s.song.name}</div>
                <button onClick={() => removeSong(s)}>Remover</button>
              </div>
            ))}
      </div>
    </div>
  );
}
