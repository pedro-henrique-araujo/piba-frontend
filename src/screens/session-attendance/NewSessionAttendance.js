import { useEffect, useState } from "react";
import { useApi } from "../../shared/useApi";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import { useNavigate } from "react-router-dom";
import { TextInput } from "@primer/react";

export default function NewSessionAttendance() {
  async function loadOptions() {
    const { data } = await api.options("/member");

    const draftItems = JSON.parse(
      localStorage.getItem("session-attendance-draft") || "[]"
    );

    const optionsWithDraft = data.map((o) => {
      const itemInDraft = draftItems.find((i) => i.id == o.id);
      if (itemInDraft) return itemInDraft;
      return o;
    });

    setItems(optionsWithDraft.sort((a, b) => a.name.localeCompare(b.name)));
  }

  function toggleItem(id) {
    const newItems = items.map((item) =>
      item.id == id ? { ...item, isPresent: !item.isPresent } : item
    );

    localStorage.setItem("session-attendance-draft", JSON.stringify(newItems));

    setItems(newItems);
  }

  async function save() {
    const payload = {
      dateTime,
      items: items.map(({ id, isPresent }) => ({
        memberId: id,
        isPresent: isPresent,
      })),
    };

    try {
      await api.post("/session-attendance", payload);
      navigate("/frequencia/sessao");
      localStorage.removeItem("session-attendance-draft");
    } catch {}
  }

  const api = useApi();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadOptions();
  }, []);

  const searchedItems = items.filter((item) =>
    search ? item.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="mx-auto p-5 max-w-xl">
      <div className="mb-5 w-20">
        <PibPrimaryButton onClick={save}>Salvar</PibPrimaryButton>
      </div>

      <TextInput
        className="mb-3"
        placeholder="Pesquisar..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="mb-3">
        <input
          type="date"
          onChange={(event) => setDateTime(event.target.value)}
          value={new Date(dateTime).toISOString().split("T")[0]}
        />
      </div>
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
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
