import React, { useState, useEffect, useRef } from "react";
import { ChevronIcon, Container, DropdownButton, DropdownList, DropdownListItem, SideButton } from "./ColorDropdown.styles";

interface SideButtonProps {
  icon: React.ReactNode;
  text: React.ReactNode;
  callback: () => void;
}

interface ColorDropdownProps {
  // options: any[];
  selectedColor: string | null;
  optionToName: (item: any, id: number) => any;
  onSelect: (id: string) => void;
  leadingButtons?: SideButtonProps[];
  trailingButtons?: SideButtonProps[];
}

interface ColorOption {
  name: string;
  code: string;
}

/**
 * Colors sourced from https://mui.com/material-ui/customization/color/
 * Shade 600
 */
const options: ColorOption[] = [
  { name: "Red", code: "#e53935" },
  { name: "Pink", code: "#d81b60" },
  { name: "Purple", code: "#8e24aa" },
  { name: "Indigo", code: "#3949ab" },
  { name: "Blue", code: "#1e88e5" },
  { name: "Cyan", code: "#00acc1" },
  { name: "Teal", code: "#00897b" },
  { name: "Green", code: "#43a047" },
  { name: "Lime", code: "#c0ca33" },
  { name: "Yellow", code: "#fdd835" },
  { name: "Amber", code: "#ffb300" },
  { name: "Orange", code: "#fb8c00" },
  { name: "Brown", code: "#6d4c41" },
  { name: "Grey", code: "#757575" },
  { name: "Blue Grey", code: "#546e7a" },
]

const ColorDropdown = (props: ColorDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selfRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (id: string) => {
    setIsOpen(false);
    props.onSelect(id);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selfRef.current && !selfRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selfRef]);
  return (
    <Container ref={selfRef} className={isOpen ? "is-open" : ""}>
      <>Selected</>
      <div style={{ width: "100%" }} />

      <div style={{ width: "33%" }}>
        <DropdownButton
          className={isOpen ? "is-open" : ""}
          onClick={() => { setIsOpen(!isOpen) }}>
          {"Test"}
          <ChevronIcon className={isOpen ? "is-open" : ""} />
        </DropdownButton>

        {isOpen && (
          <DropdownList
            leadingButtonCount={props.leadingButtons?.length ?? 0}
            trailingButtonCount={props.trailingButtons?.length ?? 0}
          >
            {options.map((option:ColorOption, id) => (
              <>
              <DropdownListItem>
                <p>{option.code}</p>
                
              </DropdownListItem>
              </>
            ))}
          </DropdownList>
        )}
      </div>

    </Container>
  );
};

export default ColorDropdown;