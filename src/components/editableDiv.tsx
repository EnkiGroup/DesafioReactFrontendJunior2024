import React, { ChangeEvent, useState } from "react";

interface EditableDivProps {
  defaultText?: string;
}

export const EditableDiv = ({ defaultText }: EditableDivProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(
    defaultText || "Clique duas vezes para editar"
  );

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === "") {
      return;
    }

    setText(event.target.value);
  };

  return (
    <div className="editable-div" onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleEnter}
          autoFocus
        />
      ) : (
        <label>{text}</label>
      )}
    </div>
  );
};
