function PibPrimaryButton({ children, onClick, disabled, width }) {
  return (
    <div className={`my-8 w-${width || 'full'} `}>
      <button
        className={`cursor-pointer w-full bg-primary text-white font-semibold rounded-lg h-10 disabled:opacity-50`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}

export default PibPrimaryButton;
