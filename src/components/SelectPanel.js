import { SelectPanel, Button } from "@primer/react";
import { useState } from "react";

function SelectPanel() {
  const items = [{ text: "test" }, { text: "test 2" }];
  const [selected, setSelected] = useState();
  const [filter, setFilter] = useState("");
  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().startsWith(filter.toLowerCase())
  );
  const [open, setOpen] = useState(false);
  return (
    <>
      <SelectPanel
        title="Selecionar membro"
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
            {children ?? "Selecionar membro"}
          </Button>
        )}
        placeholderText="Pesquisar..."
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
      />
    </>
  );
}

export default SelectPanel;
