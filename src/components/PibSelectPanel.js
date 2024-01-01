import { SelectPanel, Button, FormControl } from "@primer/react";
import { useState } from "react";

function PibSelectPanel({
  items,
  selected,
  onSelectedChange,
  label,
  title,
  placeholder,
}) {
  const [filter, setFilter] = useState("");
  const filteredItems = (items || []).filter((item) =>
    item.text.toLowerCase().startsWith(filter.toLowerCase())
  );
  const [open, setOpen] = useState(false);
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <SelectPanel
        title={title}
        renderAnchor={({
          children,
          "aria-labelledby": ariaLabelledBy,
          ...anchorProps
        }) => (
          <Button
            aria-labelledby={` ${ariaLabelledBy}`}
            {...anchorProps}
            aria-haspopup="dialog"
          >
            {children ?? title}
          </Button>
        )}
        placeholderText={placeholder}
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={onSelectedChange}
        onFilterChange={setFilter}
      />
    </FormControl>
  );
}

export default PibSelectPanel;
