import React from "react";

export const Stats = ({ packingList }) => {
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
