import React, { useEffect, useRef, useState } from "react";
import { Container, DropdownButton, DropdownList, DropdownListItem, HDivider } from "./MenuDropdown.styles";

interface OptionProps {
  name: string;
  hotkey?: string;
  enabled?: boolean;
  callback: () => void;
}

interface MenuDropdownProps {
  name: string;
  options: OptionProps[][];
  // onOpen: boolean;
  // openOnHover: boolean;
};

const MenuDropdown = (props: MenuDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selfRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (groupID: number, id: number) => {
    setIsOpen(false);
    props.options[groupID][id].callback();
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

      <div style={{ width: "100%" }}>
        <DropdownButton
          className={isOpen ? "is-open" : ""}
          onClick={() => { setIsOpen(!isOpen) }}>
          {props.name}
        </DropdownButton>

        {isOpen && (
          <DropdownList>
            {props.options.map((group, groupID) =>
              <>
                {group.map((option, id) => (
                  <DropdownListItem key={`${groupID}-${id}`} onClick={() => handleOptionClick(groupID, id)}>
                    {option.name}
                  </DropdownListItem>
                ))}

                {groupID !== props.options.length - 1 &&
                  <HDivider/>
                }
              </>
            )}
          </DropdownList>
        )}
      </div>


    </Container>
  );
};

export default MenuDropdown;