import React, { useState } from "react";
import Logo from "./Logo";

const App = () => {
  const [packingList, setPackingList] = useState([]);

  const onFormSubmit = (item) => {
    setPackingList([...packingList, item]);
  };

  const handleDeleteItem = (id) => {
    const newList = packingList.filter((item) => item.id !== id);
    setPackingList(newList);
  };

  const handleToggleItem = (e, item) => {
    const modifiedList = packingList.map((i) => {
      if (item.id === i.id) {
        return { ...item, packed: e.target.checked };
      }
      return i;
    });
    setPackingList(modifiedList);
  };

  const clearList = () => setPackingList([]);

  return (
    <div className="app">
      <Logo />
      <Form onFormSubmit={onFormSubmit} />
      <PackingList
        handleDeleteItem={handleDeleteItem}
        packingList={packingList}
        handleToggleItem={handleToggleItem}
        clearList={clearList}
      />
      <Stats packingList={packingList} />
    </div>
  );
};



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

const PackingList = ({ packingList, handleToggleItem, handleDeleteItem, clearList }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedList;

  if (sortBy === "input") sortedList = packingList;

  if (sortBy === "description") sortedList = packingList.sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedList = packingList.sort((a, b) => Number(a.packed) - Number(b.packed));

  const onSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
  }

  return (
    <div className="list">
      {sortedList.length ? (
        <ul>
          {sortedList?.map((item) => (
            <Item
              handleToggleItem={handleToggleItem}
              key={item.id}
              item={item}
              onDelete={handleDeleteItem}
            />
          ))}
        </ul>
      ) : (
        "No items"
      )}

      <div className="actions">
        <select value={sortBy} onChange={onSort}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
};

const Item = ({ item, handleToggleItem, onDelete }) => {
  return (
    <li>
      <input
        type="checkbox"
        name="packed"
        checked={item.packed}
        onChange={(e) => handleToggleItem(e, item)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
};
const Stats = ({ packingList }) => {
  if (!packingList.length)
    return (
      <p className="stats">Start adding some items to your packing list 🚀</p>
    );

  const packedItems = packingList.filter((item) => item.packed)?.length;
  const totalItems = packingList.length;
  const percentage = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ! Ready to go ✈️"
          : `🧳 You need ${totalItems} items on your list, and you already packed ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
};

export default App;
