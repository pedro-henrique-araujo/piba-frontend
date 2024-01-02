import PibPrimaryButton from "../../components/PibPrimaryButton";
import PibSelectPanel from "../../components/PibSelectPanel";
import PibRadioGroup from "../../components/PibRadioGroup";
import PibTextarea from "../../components/PibTextarea";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router";

function NewSchoolAttendance() {
  async function submit() {
    await api.post("school-attendance", {
      memberId: selectedMember.id,
      isPresent: isPresent == "true",
      excuse: excuse,
    });
    navigate("/frequencia/eb/sucesso");
  }

  async function loadMemberOptions() {
    const { data } = await api.options("member");
    setMemberOptions(
      data
        .map(({ id, name }) => ({
          id,
          text: name,
        }))
        .sort((a, b) => a.text.localeCompare(b.text))
    );
  }

  const [selectedMember, setSelectedMember] = useState();
  const [isPresent, setIsPresent] = useState("true");
  const [excuse, setExcuse] = useState();
  const [memberOptions, setMemberOptions] = useState([]);
  const [isInvalid, setIsInvalid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMemberOptions();
  }, []);

  useEffect(() => {
    if (!selectedMember) {
      setIsInvalid(true);
      return;
    }

    if (isPresent == "false" && !excuse) {
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
        {isPresent == "false" && (
          <PibTextarea
            label="Justificativa"
            placeholder="Insira uma justificativa..."
            value={excuse}
            onChange={setExcuse}
          />
        )}
        <PibPrimaryButton onClick={submit} disabled={isInvalid}>
          Enviar
        </PibPrimaryButton>
      </form>
    </div>
  );
}

export default NewSchoolAttendance;
