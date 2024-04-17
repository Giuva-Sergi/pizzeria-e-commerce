import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import Button from "../ui/Button";
import { removeItem } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, unitPrice } = item;
  const totalPrice = quantity * unitPrice;

  const dispatch = useDispatch();

  function handleDeleteItem() {
    dispatch(removeItem(pizzaId))
  }

  return (
    <li className="py-3 sm:flex sm:justify-between sm:items-center">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small" handler={handleDeleteItem}>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
