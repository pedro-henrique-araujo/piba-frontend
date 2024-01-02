import { Button } from "@primer/react";

function PibPrimaryButton({ children, onClick, disabled }) {
  return (
    <div className="my-8">
      <Button
        variant="primary"
        onClick={onClick}
        disabled={disabled}
        sx={{ width: "100%" }}
      >
        {children}
      </Button>
    </div>
  );
}

export default PibPrimaryButton;
