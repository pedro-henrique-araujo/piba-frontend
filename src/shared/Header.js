import logoSvg from "../assets/logo.svg";

function Header() {
  return (
    <div className="flex items-center flex-col my-3">
      <img src={logoSvg} alt="Pib Aquiraz" />
    </div>
  );
}

export default Header;
