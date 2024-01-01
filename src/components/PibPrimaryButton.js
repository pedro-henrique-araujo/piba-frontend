import { Button } from "@primer/react";

function PibPrimaryButton({ children, onClick }) {
  return (
    <Button variant="primary" onClick={onClick}>
      {children}
    </Button>
  );
}

export default PibPrimaryButton;
