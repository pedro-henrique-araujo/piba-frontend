function PibLoading() {
  return (
    <span className="relative flex size-20">
      <svg
        className="animate-spin"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="30"
          cy="30"
          r="25"
          stroke="currentColor"
          stroke-width="4"
          class="text-gray-200"
        />

        <circle
          cx="30"
          cy="30"
          r="25"
          stroke="currentColor"
          stroke-width="5"
          class="text-green-300"
          fill="none"
          stroke-dasharray="15 100"
          stroke-dashoffset="0"
        />
      </svg>
    </span>
  );
}

export default PibLoading;
