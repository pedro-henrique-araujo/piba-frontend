import { useEffect, useState } from "react";
import { useApi } from "../../shared/useApi";
import { useParams } from "react-router-dom";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import { TextInput } from "@primer/react";
import { useNavigate } from "react-router-dom";

export function EditSessionAttendance() {
  async function loadData() {
    const { data } = await api.get("/session-attendance/" + id);
    setItems(data.items);
    setDateTime(data.dateTime);
  }

  function toggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id == id ? { ...item, isPresent: !item.isPresent } : item
      )
    );
  }

  async function save() {
    const payload = {
      id: id,
      items: items.map(({ id, isPresent }) => ({
        id: id,
        isPresent: isPresent,
      })),
    };
    await api.put("/session-attendance", payload);
    navigate("/frequencia/sessao");
  }

  async function remove() {
    await api.delete("/session-attendance/" + id);
    navigate("/frequencia/sessao");
  }

  function openRemoveModal() {
    setDisplayRemoveModal(true);
  }

  useEffect(() => {
    loadData();
  }, []);

  const [items, setItems] = useState([]);
  const api = useApi();
  const [search, setSearch] = useState("");
  const [dateTime, setDateTime] = useState(null);
  const [displayRemoveModal, setDisplayRemoveModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const searchedItems = items.filter((item) =>
    search ? item.memberName.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <>
      <div className="mx-auto p-5 max-w-xl">
        <PibPrimaryButton width="20" onClick={save}>
          Salvar
        </PibPrimaryButton>

        <PibPrimaryButton width="20" onClick={openRemoveModal}>
          Remover
        </PibPrimaryButton>

        <TextInput
          className="mb-3"
          placeholder="Pesquisar..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {new Date(dateTime).toLocaleDateString()}
        <ul>
          {searchedItems.map((item) => (
            <li
              key={item.id}
              className={
                "mb-3 p-2 border cursor-pointer rounded " +
                (item.isPresent ? "border-emerald-300 bg-emerald-100" : "")
              }
              onClick={() => toggleItem(item.id)}
            >
              {item.memberName}
            </li>
          ))}
        </ul>
      </div>
      {displayRemoveModal && (
        <div className="absolute top-0 bg-neutral-950/25 backdrop-blur w-full h-full">
          <div className="bg-white rounded mx-auto p-5 max-w-xl mt-40">
            <div>Tem certeza que você quer remover esse registro?</div>
            <button onClick={remove}>Sim</button>
            <button onClick={() => setDisplayRemoveModal(false)}>Não</button>
          </div>
        </div>
      )}
    </>
  );
}
