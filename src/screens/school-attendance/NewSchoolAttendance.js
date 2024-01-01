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
    navigate("success");
  }

  async function loadMemberOptions() {
    const { data } = await api.options("member");
    setMemberOptions(
      data.map(({ id, name }) => ({
        id,
        text: name,
      }))
    );
  }

  useEffect(() => {
    loadMemberOptions();
  }, []);

  const [selectedMember, setSelectedMember] = useState();
  const [isPresent, setIsPresent] = useState("true");
  const [excuse, setExcuse] = useState();
  const [memberOptions, setMemberOptions] = useState([]);
  const navigate = useNavigate();

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
    <form>
      <PibSelectPanel
        label="Nome"
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
      <PibTextarea label="Justificativa" value={excuse} onChange={setExcuse} />
      <PibPrimaryButton onClick={submit}>Enviar</PibPrimaryButton>
    </form>
  );
}

export default NewSchoolAttendance;
