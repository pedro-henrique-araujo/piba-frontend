import { RadioGroup, FormControl, Radio } from "@primer/react";

function PibRadioGroup({ onChange, value, label, options }) {
  return (
    <div className="my-8 font-medium">
      <RadioGroup onChange={onChange}>
        <RadioGroup.Label>{label}</RadioGroup.Label>
        {options.map((o) => (
          <FormControl key={o.value}>
            <Radio value={o.value} checked={o.value == value} />
            <FormControl.Label>{o.label}</FormControl.Label>
          </FormControl>
        ))}
      </RadioGroup>
    </div>
  );
}

export default PibRadioGroup;
