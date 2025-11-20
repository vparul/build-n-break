import { Button } from "./Button";

export const Friend = ({
  data,
  onSelectedFriendButtonClick,
  selectedFriend,
}) => {
  const { id, name, balance, image } = data;

  const isSelected = selectedFriend?.id === id;

  const getResult = () => {
    if (balance < 0)
      return (
        <p className="red">
          You ows {name} ${Math.abs(balance)}
        </p>
      );
    else if (balance > 0)
      return (
        <p className="green">
          {name} ows you ${balance}
        </p>
      );
    return <p>You & {name} are equal</p>;
  };

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {getResult()}
      <Button onClick={() => onSelectedFriendButtonClick(data)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
};
