import { Friend } from "./Friend";

export const FriendList = ({
  selectedFriend,
  friendList,
  onSelectedFriendButtonClick,
}) => {
  return (
    <ul>
      {friendList.map((friend) => (
        <Friend
          onSelectedFriendButtonClick={onSelectedFriendButtonClick}
          key={friend.id}
          data={friend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};
