import { useApi } from "../../shared/useApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import chevronLeftLink from "../../assets/chevron-left-link.svg";
import { useNavigate } from "react-router-dom";
import PibBlankButton from "../../components/PibBlankButton";
import PibPrimaryButton from "../../components/PibPrimaryButton";

function ViewSong() {
  function extractYoutubeId(url) {
    try {
      const urlObj = new URL(url);

      if (urlObj.hostname.includes("youtube.com")) {
        return urlObj.searchParams.get("v") || false;
      }

      if (urlObj.hostname.includes("youtu.be")) {
        const id = urlObj.pathname.substring(1);
        return id || false;
      }

      return false;
    } catch {
      return false;
    }
  }

  function embedYoutubeUrl(url) {
    const id = extractYoutubeId(url);
    if (!id) {
      return <div>Link inválido: "{url}"</div>;
    }

    return (
      <iframe
        src={"https://youtube.com/embed/" + id}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    );
  }

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

  console.log(song?.links.map(() => <div>teste</div>));
  return (
    <div className="mx-auto p-5 max-w-xl">
      <div className="mb-5 w-20 flex w-full">
        <div className="w-20">
          <PibBlankButton onClick={() => navigate("/musica")}>
            <div className="flex">
              <img src={chevronLeftLink} />
              <span>Voltar</span>
            </div>
          </PibBlankButton>
        </div>
        <div className="w-20">
          <PibPrimaryButton onClick={() => navigate("/musica/editar/" + id)}>
            Editar
          </PibPrimaryButton>
        </div>
      </div>
      <div>
        <strong>Nome: </strong>
        {song?.name}
        <div className="flex flex-col gap-8 mt-8">
          {song?.links.map((l) => (
            <div key={l.id}>{embedYoutubeUrl(l.url)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewSong;
