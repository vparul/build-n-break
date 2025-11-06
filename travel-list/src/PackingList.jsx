import { useState } from "react";
import Item from "./Item";

const PackingList = ({
  packingList,
  handleToggleItem,
  handleDeleteItem,
  clearList,
}) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedList;

  if (sortBy === "input") sortedList = packingList;

  if (sortBy === "description")
    sortedList = packingList.sort((a, b) =>
      a.description.localeCompare(b.description)
    );

  if (sortBy === "packed")
    sortedList = packingList.sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );

  const onSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
  };

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

export default PackingList;
