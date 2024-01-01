import { FormControl, Textarea } from "@primer/react";

function PibTextarea({ label, value, onChange }) {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </FormControl>
  );
}

export default PibTextarea;
