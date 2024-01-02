import logoSvg from "../assets/logo.svg";

function Header() {
  return (
    <div className="flex items-center flex-col my-3">
      <img src={logoSvg} />
      <p className="font-medium text-xs my-1">PIB Aquiraz</p>
    </div>
  );
}

export default Header;
