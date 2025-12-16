import PibPrimaryButton from "../../components/PibPrimaryButton";
import PibSelectPanel from "../../components/PibSelectPanel";
import PibRadioGroup from "../../components/PibRadioGroup";
import PibTextarea from "../../components/PibTextarea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PibLocationIcon from "../../components/PibLocationIcon";
import { useApi } from "../../shared/useApi";

function NewSchoolAttendance() {
  async function submit() {
    setIsSending(true);
    const { latitude, longitude } = userPosition?.coords || {};
    await api.post("school-attendance", {
      memberId: selectedMember.id,
      isPresent: isPresent === "true",
      excuse: excuse,
      latitude: latitude,
      longitude: longitude,
    });
    navigate("/frequencia/eb/sucesso");
  }

  async function loadMemberOptions() {
    setIsLoading(true);
    const { data } = await api.options("member");
    setMemberOptions(
      data
        .map(({ id, name }) => ({
          id,
          text: name,
        }))
        .sort((a, b) => a.text.localeCompare(b.text)),
    );
    setIsLoading(false);
  }

  function loadUserLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(setUserPosition);
  }

  const [selectedMember, setSelectedMember] = useState();
  const [isPresent, setIsPresent] = useState("true");
  const [excuse, setExcuse] = useState();
  const [memberOptions, setMemberOptions] = useState([]);
  const [isInvalid, setIsInvalid] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPosition, setUserPosition] = useState();
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    loadMemberOptions();
    loadUserLocation();
  }, []);

  useEffect(() => {
    if (!selectedMember) {
      setIsInvalid(true);
      return;
    }

    if (isPresent === "false" && !excuse) {
      setIsInvalid(true);
      return;
    }

    setIsInvalid(false);
  }, [selectedMember, isPresent, excuse]);

  const isPresentOptions = [
    {
      value: "true",
      label: "Sim",
    },
    {
      value: "false",
      label: "Não",
    },
  ];

  return (
    <div className="mx-auto p-5 max-w-xl">
      <h1 className="font-bold text-2xl">Indicar Frequência</h1>
      <form>
        <PibSelectPanel
          isLoading={isLoading}
          label="Nome do membro"
          title="Selecionar membro"
          placeholder="Pesquisar..."
          items={memberOptions}
          selected={selectedMember}
          onSelectedChange={setSelectedMember}
        />
        <PibRadioGroup
          label="Presente?"
          options={isPresentOptions}
          onChange={setIsPresent}
          value={isPresent}
        />
        {isPresent === "false" && (
          <PibTextarea
            label="Justificativa"
            placeholder="Insira uma justificativa..."
            value={excuse}
            onChange={setExcuse}
          />
        )}

        <div className="flex gap-2 items-center text-sm text-gray-500">
          <PibLocationIcon />
          <span>Ative a localização</span>
        </div>
        <div className="mt-8">
          <PibPrimaryButton onClick={submit} disabled={isInvalid || isSending}>
            {isSending ? "Enviando..." : "Enviar"}
          </PibPrimaryButton>
        </div>
      </form>
    </div>
  );
}

export default NewSchoolAttendance;
