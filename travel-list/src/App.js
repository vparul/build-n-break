import React, { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import { Stats } from "./Stats";

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

export default App;
