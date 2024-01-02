import { Button } from "@primer/react";

function PibPrimaryButton({ children, onClick, disabled }) {
  return (
    <div className="my-6">
      <Button variant="primary" onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    </div>
  );
}

export default PibPrimaryButton;
