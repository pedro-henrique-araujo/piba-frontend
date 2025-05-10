import React from "react";
import { useNavigate } from "react-router-dom";
import PibPrimaryButton from "../../components/PibPrimaryButton";

const Menu = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="mx-auto p-5 max-w-xl">
      <h1 className="font-bold text-2xl">Menu</h1>
      <div className="mt-5">
        <div className="mb-5">
          <PibPrimaryButton onClick={() => handleNavigation("/frequencia/eb")}>
            Frequência Escola Bíblica
          </PibPrimaryButton>
        </div>

        <div className="mb-5">
          <PibPrimaryButton
            onClick={() => handleNavigation("/calendario/cante")}
          >
            Calendário Cante
          </PibPrimaryButton>
        </div>

        <div className="mb-5">
          <PibPrimaryButton
            onClick={() => handleNavigation("/calendario/midia")}
          >
            Calendário da Mídia
          </PibPrimaryButton>
        </div>
        <div className="mb-5">
          <PibPrimaryButton onClick={() => handleNavigation("/musica")}>
            Músicas
          </PibPrimaryButton>
        </div>

        <div className="mb-5">
          <PibPrimaryButton
            onClick={() => handleNavigation("/frequencia/sessao")}
          >
            Frequência Sessão
          </PibPrimaryButton>
        </div>
        <div className="mb-5">
          <PibPrimaryButton onClick={() => handleNavigation("/usuario")}>
            Usuários
          </PibPrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Menu;
