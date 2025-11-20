import { Button } from "./Button";
import { useState } from "react";

export const FormAddFriend = ({ onAddFriend }) => {
  const [formValues, setFormValues] = useState({ name: "", image: "" });

  const onInputChange = (e, key) => {
    setFormValues((prevValue) => ({
      ...prevValue,
      [key]: e.target.value,
    }));
  };

  const onSubmit = () => {
    if (!formValues?.name || !formValues?.image) return;

    const newFriend = {
      ...formValues,
      id: crypto.randomUUID(),
      balance: 0,
    };
    onAddFriend(newFriend);
  };

  return (
    <form className="form-add-friend" onSubmit={onSubmit}>
      <label>👯 Friend Name</label>
      <input
        type="text"
        value={formValues.name}
        onChange={(e) => onInputChange(e, "name")}
      />

      <label>🎇 Image URL</label>
      <input
        type="text"
        value={formValues.image}
        onChange={(e) => onInputChange(e, "image")}
      />

      <Button>Add</Button>
    </form>
  );
};
