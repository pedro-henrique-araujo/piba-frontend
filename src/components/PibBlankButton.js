function PibBlankButton({ children, onClick, disabled }) {
  return (
    <button
      className="cursor-pointer w-full text-white font-semibold rounded-lg h-10 disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PibBlankButton;
