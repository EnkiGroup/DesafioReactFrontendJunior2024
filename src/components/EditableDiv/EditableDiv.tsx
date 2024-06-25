import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./EditableDiv.module.css";

interface EditableDivProps {
  defaultText?: string;
  completed?: boolean;
}

export const EditableDiv = ({ defaultText, completed }: EditableDivProps) => {
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

  useEffect(() => {
    setText(defaultText || "Clique duas vezes para editar");
  }, [defaultText]);

  return (
    <div className={styles.editableDiv} onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleEnter}
          autoFocus
          className={styles.editableDivInput}
        />
      ) : (
        <label className={`${completed ? styles.lineThrough : ""}`}>
          {text}
        </label>
      )}
    </div>
  );
};
