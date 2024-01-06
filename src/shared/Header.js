import logoSvg from "../assets/logo.svg";

function Header() {
  return (
    <div className="flex items-center flex-col my-3">
      <img src={logoSvg} />
    </div>
  );
}

export default Header;
