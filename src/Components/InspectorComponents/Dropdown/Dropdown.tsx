import React, {useState} from "react";
import { ChevronIcon, Container, DropdownButton, DropdownList, DropdownListItem } from "./Dropdown.styles";

interface DropdownProps {
  options: string[];
  defaultOption?: string;
  onSelect:(selectedOption: string) => void;
}

const Dropdown = (props:DropdownProps) => {
  const [selected, setSelected] = useState(props.defaultOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    props.onSelect(option);
  }

  return (
    <Container>
      <DropdownButton className={isOpen ? "is-open" : ""} onClick={()=> {setIsOpen(!isOpen)}}>
        {selected}
        <ChevronIcon className={isOpen ? "is-open" : ""} />
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {props.options.map((option) => (
            <DropdownListItem key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

export default Dropdown;