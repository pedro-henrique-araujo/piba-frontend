import PibBlankButton from "../../components/PibBlankButton";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import { useNavigate } from "react-router-dom";
import chevronLeftLink from "../../assets/chevron-left-link.svg";
import { useEffect, useRef, useState } from "react";
import { useApi } from "../../shared/useApi";
import { useParams } from "react-router-dom";

function EditSong() {
  async function save() {
    await api.put("/song", { id, name, links });
   navigate("/musica/" + id);
  }

  async function loadData() {
    const { data } = await api.get("/song/" + id);
    setName(data.name);
    setLinks(data.links);
  }

  function handleMoreLinkBlur() {
    if (!moreUrl) return;
    setLinks([
      ...links,
      {
        url: moreUrl,
      },
    ]);

    setMoreUrl("");
  }

  function handleMoreLinkChange(value) {
    setMoreUrl(value);
  }

  function removeLink(i) {
    links.splice(i, 1);
    setLinks([...links]);
  }

  function setUrl(value, index) {
    links[index].url = value;
    setLinks([...links]);
  }

  function onExistingLinkBlur(value, index) {
    if (value) return;
    removeLink(index);
  }

  useEffect(() => {
    loadData();
  }, []);

  const api = useApi();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [links, setLinks] = useState([]);

  const [moreUrl, setMoreUrl] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [timeoutExecuted, setTimeoutExecuted] = useState(false);
  const lastLinkInputRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    clearTimeout(timeoutId);
    if (!moreUrl) return;
    setTimeoutId(
      setTimeout(() => {
        handleMoreLinkBlur();
        setTimeoutExecuted(true);
      }, 2000),
    );
  }, [moreUrl]);

  useEffect(() => {
    if (!timeoutExecuted) return;
    lastLinkInputRef.current?.focus();
    setTimeoutExecuted(false);
  }, [timeoutExecuted]);

  return (
    <div className="mx-auto p-5 max-w-xl">
      <div className="mb-5 w-20 flex w-full">
        <div className="w-20">
          <PibBlankButton onClick={() => navigate("/musica/" + id)}>
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
      <div>
        <label className="font-bold">Links</label>
      </div>
      <div>
        {links.map((l, i) => (
          <div className="mt-1 mb-3 flex flex-col gap-3" key={i}>
            <div className="flex gap-3">
              <input
                ref={i === links.length - 1 ? lastLinkInputRef : null}
                className="h-9 w-3/4 px-3 border border-gray-300 rounded rounded-lg shadow-sm bg-white"
                value={l.url}
                onChange={(event) => setUrl(event.target.value, i)}
                onBlur={(e) => onExistingLinkBlur(e.target.value, i)}
              />
              <button onClick={() => removeLink(i)}>Remover</button>
            </div>
          </div>
        ))}
        <div className="mt-1 mb-3 flex flex-col gap-3" key={links.length}>
          <input
            className="h-9 w-3/4 px-3 border border-gray-300 rounded rounded-lg shadow-sm bg-white"
            placeholder="Coloque um link aqui..."
            value={moreUrl}
            onChange={(e) => handleMoreLinkChange(e.target.value)}
            onBlur={handleMoreLinkBlur}
          />
        </div>
      </div>
    </div>
  );
}

export default EditSong;
