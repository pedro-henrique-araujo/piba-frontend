import { useEffect, useState, useRef } from "react";
import PibSelectPanelSelector from "./PibSelectPanelSelector";
import PibSearchInput from "./PibSearchInput";

function PibSelectPanel({
  items,
  selected,
  onSelectedChange,
  label,
  title,
  placeholder,
}) {
  function removeAccents(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function searchItem(item) {
    return removeAccents(item.text)
      .toLowerCase()
      .includes(removeAccents(filter).toLowerCase());
  }

  function handleOpenButtonClick(event) {
    event.preventDefault();
    setOpen(!open);
  }

  function handleSelectionClick(event, item) {
    event.preventDefault();
    onSelectedChange(selected === item ? null : item);
    setOpen(false);
  }

  const [filter, setFilter] = useState("");
  const filteredItems = (items || []).filter(searchItem);
  const [open, setOpen] = useState(false);
  const [isSearchSelected, setIsSearchSelected] = useState(false);
  const myElementRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        myElementRef?.current &&
        !myElementRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={myElementRef} className="my-8 relative">
      <div className="font-semibold mb-1">{label}</div>
      <button
        className="w-full font-semibold border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 shadow-sm h-10 outline-none"
        onClick={handleOpenButtonClick}
      >
        {selected?.text || title}
      </button>
      {open && (
        <div className="shadow rounded-lg absolute w-full bg-white z-10 mt-1">
          <div className="p-2">
            <div className="font-semibold m-2">{title}</div>
            <PibSearchInput
              isSearchSelected={isSearchSelected}
              onFocus={() => setIsSearchSelected(true)}
              onBlur={() => setIsSearchSelected(false)}
              value={filter}
              setValue={setFilter}
              placeholder={placeholder}
            />
          </div>
          <PibSelectPanelSelector
            selected={selected}
            items={filteredItems}
            onSelectedChange={handleSelectionClick}
          />
        </div>
      )}
    </div>
  );
}

export default PibSelectPanel;
