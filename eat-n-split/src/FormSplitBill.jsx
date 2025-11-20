import { Button } from "./Button";
import { useState } from "react";

export const FormSplitBill = ({ selectedFriend, splitBill }) => {
  const { name, balance } = selectedFriend;

  const [formValues, setFormValues] = useState({
    totalAmount: "",
    myExpense: "",
    friendExpense: "",
  });

  const onInputChange = ({ target }, key) => {
    const value = Number(target.value);
    const friendExpense =
      key === "myExpense" &&
      formValues?.totalAmount &&
      formValues?.totalAmount > value
        ? formValues.totalAmount - value
        : "";
    setFormValues((prevValue) => ({
      ...prevValue,
      [key]: value,
      friendExpense: Number(friendExpense),
    }));
  };

  const onSelectChange = ({ target }) => {
    setFormValues((prevValue) => ({
      ...prevValue,
      payer: target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    splitBill(formValues);
  };
  return (
    <form className="form-split-bill" onSubmit={onSubmit}>
      <h2>Split a bill with {name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="number"
        value={formValues.totalAmount}
        name="totalAmount"
        onChange={(e) => onInputChange(e, "totalAmount")}
      />

      <label>🕴 Your Expense</label>
      <input
        type="number"
        value={formValues.myExpense}
        name="totalAmount"
        onChange={(e) => onInputChange(e, "myExpense")}
      />

      <label>👯 {name} Expense</label>
      <input
        disabled
        type="number"
        value={formValues.friendExpense}
        name="friendExpense"
      />

      <label>🤑 Who is paying the bill</label>
      <select value={formValues.payer} name="payer" onChange={onSelectChange}>
        <option value="user">You</option>
        <option value={name}>{name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};
