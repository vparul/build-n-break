import { useState } from "react";

const Form = ({ onFormSubmit }) => {
  const [formValues, setFormValues] = useState({
    description: "",
    quantity: 1,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formValues.description) return;

    const newItem = {
      ...formValues,
      id: Date.now(),
      packed: false,
    };
    setFormValues({ description: "", quantity: 1 });
    onFormSubmit(newItem);
  };

  const onFormChange = ({ target }, key) =>
    setFormValues((prevValue) => ({
      ...prevValue,
      [key]: target?.value,
    }));

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name="item"
        value={formValues.quantity}
        onChange={(e) => onFormChange(e, "quantity")}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={formValues.description}
        onChange={(e) => onFormChange(e, "description")}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
