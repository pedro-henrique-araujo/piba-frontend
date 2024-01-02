import { Link } from "react-router-dom";
import PibPrimaryButton from "../../components/PibPrimaryButton";

function SchoolAttendanceSuccessfullyCreated() {
  return (
    <div className="mx-auto p-5 max-w-xl text-center font-medium">
      <p>Frequência indicada com sucesso!</p>
      <Link to="/frequencia/eb">
        <PibPrimaryButton>Enviar outra</PibPrimaryButton>
      </Link>
    </div>
  );
}

export default SchoolAttendanceSuccessfullyCreated;
