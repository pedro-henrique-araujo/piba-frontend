import React from "react";
import { useNavigate } from "react-router-dom";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import { useAuth } from "../../AuthProvider";

const Menu = () => {
  const navigate = useNavigate();

  function handleNavigation(path) {
    navigate(path);
  }

  function logOut() {
    clearToken();
    navigate("/login");
  }

  const { includesAnyRoles, clearToken } = useAuth();

  return (
    <div className="mx-auto p-5 max-w-xl">
      <h1 className="font-bold text-2xl">Menu</h1>
      <div className="mt-5">
        {includesAnyRoles("cante") && (
          <div className="mb-5">
            <PibPrimaryButton
              onClick={() => handleNavigation("/calendario/cante")}
            >
              Calendário Cante
            </PibPrimaryButton>
          </div>
        )}

        {includesAnyRoles("media") && (
          <div className="mb-5">
            <PibPrimaryButton
              onClick={() => handleNavigation("/calendario/midia")}
            >
              Calendário da Mídia
            </PibPrimaryButton>
          </div>
        )}

        {includesAnyRoles("cante", "media") && (
          <div className="mb-5">
            <PibPrimaryButton onClick={() => handleNavigation("/musica")}>
              Músicas
            </PibPrimaryButton>
          </div>
        )}

        {includesAnyRoles("admin") && (
          <div className="mb-5">
            <PibPrimaryButton
              onClick={() => handleNavigation("/frequencia/sessao")}
            >
              Frequência Sessão
            </PibPrimaryButton>
          </div>
        )}
        {includesAnyRoles("admin") && (
          <div className="mb-5">
            <PibPrimaryButton onClick={() => handleNavigation("/usuario")}>
              Usuários
            </PibPrimaryButton>
          </div>
        )}

        <div className="mb-5">
          <PibPrimaryButton onClick={() => logOut()}>Sair</PibPrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Menu;
