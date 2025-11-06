import React from "react";

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
export default Item;
