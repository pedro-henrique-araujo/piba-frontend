import checkSvg from "../assets/check.svg";
import PibLoading from "./PibLoading";

function PibSelectPanelSelector({
  selected,
  items,
  onSelectedChange,
  isLoading = false,
}) {
  return (
    <div className="border-t border-gray-300 mt-1">
      <div className="p-2 h-96 overflow-y-scroll">
        {isLoading ? (
          <div className="h-52 flex items-center justify-center">
            <PibLoading />
          </div>
        ) : (
          items?.map((item) => (
            <button
              key={item.id}
              onClick={(event) => onSelectedChange(event, item)}
              className={
                "py-2 px-5 hover:bg-gray-100 rounded-lg flex items-center w-full mb-1" +
                (selected === item ? " bg-gray-100" : "")
              }
            >
              <div className="w-8">
                {selected === item && <img src={checkSvg} />}
              </div>
              <div className="w-full text-left">{item.text}</div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default PibSelectPanelSelector;
