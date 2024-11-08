import { useEffect, useState } from "react";
import { useApi } from "../../shared/useApi";
import { useParams } from "react-router-dom";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import PibBlankButton from "../../components/PibBlankButton";
import { TextInput } from "@primer/react";
import { useNavigate } from "react-router-dom";
import trashSvg from "../../assets/trash.svg";
import PibDeletionConfirmationModalWindow from "../../components/PibDeletionConfirmationModalWindow";
import chevronLeftLink from "../../assets/chevron-left-link.svg";
import PibButtonsSelector from "../../components/PibButtonsSelector";

export function EditSessionAttendance() {
  async function loadData() {
    const { data } = await api.get("/session-attendance/" + id);
    setItems(data.items);
    setDateTime(new Date(data.dateTime).toISOString().split("T")[0]);
  }

  function toggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id == id ? { ...item, isPresent: !item.isPresent } : item,
      ),
    );
  }

  async function save() {
    const payload = {
      id: id,
      dateTime,
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
  const [statusFilter, setStatusFilter] = useState("all");

  const searchedItems = items.filter((item) => {
    const searchMatch = item?.memberName
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "present" && item.isPresent) ||
      (statusFilter === "absent" && !item.isPresent);
    return searchMatch && statusMatch;
  });

  return (
    <>
      <div className="mx-auto p-5 max-w-xl">
        <div className="flex justify-between mb-5">
          <div>
            <div className="w-20 flex w-full">
              <div className="w-20">
                <PibBlankButton onClick={() => navigate("/frequencia/sessao")}>
                  <div className="flex">
                    <img src={chevronLeftLink} />
                    <span>Voltar</span>
                  </div>
                </PibBlankButton>
              </div>
              <div className="w-20">
                <PibPrimaryButton onClick={save}>Salvar</PibPrimaryButton>
              </div>
            </div>
          </div>
          <div className="w-10">
            <PibBlankButton onClick={openRemoveModal}>
              <div className="flex justify-center align-center">
                <img src={trashSvg} />
              </div>
            </PibBlankButton>
          </div>
        </div>

        <TextInput
          className="mb-3"
          sx={{ fontSize: "1rem", height: "2.25rem", width: "75%" }}
          placeholder="Pesquisar..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <PibButtonsSelector
          onChange={setStatusFilter}
          value={statusFilter}
          items={[
            { value: "all", label: "Todos" },
            { value: "present", label: "Presentes" },
            { value: "absent", label: "Ausentes" },
          ]}
        />
        <div className="mt-1 mb-3">
          <input
            className="h-9 w-3/4 px-3 border border-gray-300 rounded rounded-lg shadow-sm bg-white"
            type="date"
            onChange={(event) => setDateTime(event.target.value)}
            value={dateTime}
          />
        </div>
        <ul>
          {searchedItems.length > 0 ? (
            searchedItems.map((item) => (
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
            ))
          ) : (
            <div className="text-center">
              Não há membros{" "}
              {statusFilter === "all"
                ? ""
                : statusFilter == "present"
                  ? "presentes"
                  : "ausentes"}
            </div>
          )}
        </ul>
      </div>
      <PibDeletionConfirmationModalWindow
        visible={displayRemoveModal}
        onClose={() => setDisplayRemoveModal(false)}
        onConfirm={remove}
      />
    </>
  );
}
