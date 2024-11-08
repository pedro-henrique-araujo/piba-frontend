function PibButtonsSelector({ onChange, value, items }) {
  return (
    <div className="mb-2">
      {items?.map((item) => (
        <button
          className={`${
            item.value === value
              ? "bg-green-100 text-primary"
              : "bg-gray-100 text-gray-700"
          } px-3 py-1 rounded-2xl mr-2`}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default PibButtonsSelector;
