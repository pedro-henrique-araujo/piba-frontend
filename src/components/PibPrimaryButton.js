function PibPrimaryButton({ children, onClick, disabled }) {
  return (
    <button
      className="cursor-pointer w-full hover:bg-primary-hover bg-primary text-white font-semibold rounded-lg h-10 disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PibPrimaryButton;
