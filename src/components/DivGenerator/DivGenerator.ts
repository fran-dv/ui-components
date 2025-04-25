interface CustomDataAttr {
  name: string; // pass it without data- prefix. It must be camelCase or kebab-case
  value: string;
}

interface DivProps {
  classes?: string[];
  id?: string;
  customAttrs?: CustomDataAttr[];
}

export const generateDiv = ({
  classes,
  id,
  customAttrs,
}: DivProps = {}): HTMLDivElement => {
  const div = document.createElement("div");

  if (classes) {
    div.classList.add(...classes);
  }

  if (id) {
    div.id = id;
  }

  if (customAttrs) {
    customAttrs.forEach((attr) => {
      if (/\s/.test(attr.name)) {
        console.error(`'${attr.name}' is not valid. It can't contain spaces`);
        return;
      }

      div.dataset[attr.name] = attr.value;
    });
  }

  return div;
};
