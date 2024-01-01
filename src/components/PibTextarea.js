import { FormControl, Textarea } from "@primer/react";

function PibTextarea({ label, value, onChange, placeholder }) {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </FormControl>
  );
}

export default PibTextarea;
