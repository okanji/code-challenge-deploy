import React, { useState } from "react";
import Select from "react-select";

function Dropdown({ items, onInput, id, label, errorText, formState }) {
  const [displayError, setDisplayError] = useState(false);

  function handleChange(event) {
    const value = event.value;

    onInput(id, value, true);
    setDisplayError(false);
  }

  function handleBlur() {
    if (!formState.inputs.type.value) {
      setDisplayError(true);
    }
  }

  return (
    <div
      className={`form-control ${displayError ? "form-control--invalid" : ""}`}
    >
      <label htmlFor={id}>{label}</label>
      <Select options={items} onChange={handleChange} onBlur={handleBlur} />
      <p>{displayError && errorText}</p>
    </div>
  );
}

export default Dropdown;
