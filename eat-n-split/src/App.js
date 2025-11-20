import { useState } from "react";
import "./App.css";
import { FriendList } from "./FriendList";
import { FormAddFriend } from "./FormAddFriend";
import { Button } from "./Button";
import { FormSplitBill } from "./FormSplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [addFriendFormVisibility, setAddFriendFormValuesVisibility] =
    useState(false);
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const toggleAddFriendFormVisibility = () => {
    setAddFriendFormValuesVisibility((show) => !show);
  };

  const onAddFriend = (friend) => {
    setFriendList((prevList) => [...prevList, friend]);
    toggleAddFriendFormVisibility();
  };

  const onSelectedFriendButtonClick = (friend) => {
    setSelectedFriend((selected) => (selectedFriend?.id === friend.id ? null : friend));
    setAddFriendFormValuesVisibility(false);
  };

  const splitBill = ({ payer, friendExpense, myExpense }) => {
    let newList = [];
    if (payer === "user") {
      newList = friendList.map(friend => friend.id === selectedFriend.id
        ? {
          ...friend,
          balance: Number(selectedFriend.balance) + Number(friendExpense),
        }
        : friend)

    } else {
      newList = friendList.map(friend => friend.id === selectedFriend.id
        ? {
          ...friend,
          balance: Number(selectedFriend.balance) - Number(friendExpense),
        }
        : friend)
      setFriendList(newList);
    }
    setFriendList(newList);

  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendList={friendList}
          selectedFriend={selectedFriend}
          onSelectedFriendButtonClick={onSelectedFriendButtonClick}
        />

        {addFriendFormVisibility && <FormAddFriend onAddFriend={onAddFriend} />}
        <Button onClick={toggleAddFriendFormVisibility}>
          {addFriendFormVisibility ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill selectedFriend={selectedFriend} splitBill={splitBill} />
      )}
    </div>
  );
}

export default App;
