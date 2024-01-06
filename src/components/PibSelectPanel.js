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
  function removeAccents(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function searchItem(item) {
    return removeAccents(item.text)
      .toLowerCase()
      .includes(removeAccents(filter).toLowerCase());
  }

  const [filter, setFilter] = useState("");
  const filteredItems = (items || []).filter(searchItem);
  const [open, setOpen] = useState(false);
  return (
    <div className="my-8">
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
              sx={{ width: "100%", height: "40px" }}
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
          overlayProps={{
            width: "small",
          }}
        />
      </FormControl>
    </div>
  );
}

export default PibSelectPanel;
