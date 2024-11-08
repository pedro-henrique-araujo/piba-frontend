import searchSvg from "../assets/search.svg";

function PibSearchInput({
  reference,
  isSearchSelected,
  onFocus,
  onBlur,
  value,
  setValue,
  placeholder,
}) {
  return (
    <div
      className={`w-full px-2 h-9 border border-gray-300 rounded-md bg-gray-50 ${isSearchSelected && "outline"} outline-2 outline-blue-600 flex items-center`}
    >
      <div className="pl-1">
        <img src={searchSvg} />
      </div>

      <input
        ref={reference}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full h-full m-0 bg-transparent outline-none pl-2 pb-1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default PibSearchInput;
