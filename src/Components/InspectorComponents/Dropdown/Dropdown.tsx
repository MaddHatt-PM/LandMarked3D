import React, { useState, useEffect, useRef } from "react";
import { Label } from "../NumberField/NumberField.styles";
import { ChevronIcon, Container, DropdownButton, DropdownList, DropdownListItem, SideButton } from "./Dropdown.styles";

interface SideButtonProps {
  icon: React.ReactNode;
  text: React.ReactNode;
  callback: () => void;
}

interface DeselectOption {
  selectedText: string;
  optionText: string;
  onSelect: () => void;
  value: any;
}

interface DropdownProps {
  label?: React.ReactNode;
  leadingButtons?: SideButtonProps[];
  trailingButtons?: SideButtonProps[];

  options: any[];
  selectedID: number | null;
  optionToName: (item: any, id: number) => any;
  onSelect: (id: number) => void;
  deselectOption?: DeselectOption;
}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selfRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (id: number) => {
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

  const getSelectedName = () => {
    const id = props.selectedID;
    if (id !== null && 0 <= id && id < props.options.length) {
      const selected = props.options[id];
      return props.optionToName(selected, id);
    }

    if (props.options.length === 0) {
      return "Create an option"
    }

    return "Select a polygon to edit"
  }

  return (
    <Container ref={selfRef} className={isOpen ? "is-open" : ""}>
      <Label>{props.label}</Label>

      {props.leadingButtons?.map((data, index) => (
        <SideButton key={index} onClick={data.callback}>
          {data.icon}
        </SideButton>
      ))}

      <div style={{ width: "100%" }}>
        <DropdownButton
          className={isOpen ? "is-open" : ""}
          onClick={() => { setIsOpen(!isOpen) }}>
          {getSelectedName()}
          <ChevronIcon className={isOpen ? "is-open" : ""} />
        </DropdownButton>

        {isOpen && (
          <DropdownList
            leadingButtonCount={props.leadingButtons?.length ?? 0}
            trailingButtonCount={props.trailingButtons?.length ?? 0}
          >
            {props.options.map((option, id) => (
              <DropdownListItem key={id} onClick={() => handleOptionClick(id)}>
                {props.optionToName ? props.optionToName(option, id) : option}
              </DropdownListItem>
            ))}
          </DropdownList>
        )}
      </div>

      {props.trailingButtons?.map((data, index) => (
        <SideButton key={index} onClick={data.callback}>
          {data.icon}
        </SideButton>
      ))}

    </Container>
  );
};

export default Dropdown;