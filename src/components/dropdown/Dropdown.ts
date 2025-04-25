import "./dropdown.css";

interface DropdownProps {
  container: HTMLDivElement;
  button: HTMLButtonElement;
  content: HTMLDivElement;
}

const enum Classes {
  container = "dropdown",
  button = "dropdown-btn",
  content = "dropdown-content",
  hidden = "hidden",
}

const toggleVisibility = (content: HTMLDivElement) => {
  content.classList.toggle(Classes.hidden);
};

export const createDropdown = ({
  container,
  button,
  content,
}: DropdownProps) => {
  container.classList.add(Classes.container);
  button.classList.add(Classes.button);
  content.classList.add(Classes.content, Classes.hidden);

  const handleClick = () => toggleVisibility(content);
  const handleBlur = () => {
    if (!content.classList.contains(Classes.hidden)) {
      toggleVisibility(content);
    }
  };

  button.addEventListener("click", handleClick);
  button.addEventListener("blur", handleBlur);

  return {
    destroy() {
      button.removeEventListener("click", handleClick);
      button.removeEventListener("blur", handleBlur);
    },
  };
};
