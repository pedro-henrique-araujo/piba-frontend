import { Button } from "@primer/react";

function PibPrimaryButton({ children, onClick, disabled }) {
  return (
    <Button variant="primary" onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
}

export default PibPrimaryButton;
