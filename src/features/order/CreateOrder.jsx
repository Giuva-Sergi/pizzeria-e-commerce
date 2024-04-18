import { useEffect, useState } from "react";
import { Form, useActionData, redirect, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, getUsername } from "../user/userSlice";
import { getCart, clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector(state => state.user);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority && totalCartPrice * 0.2;
  const totalPrice = totalCartPrice + priorityPrice; 
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoadingPosition = addressStatus === "loading";
  const errors = useActionData();
  const dispatch = useDispatch();

  useEffect(() => {
    if(navigation.state === "loading") {
      dispatch(clearCart())
    }
  }, [navigation.state, dispatch])
  

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let&apos;s go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {errors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{errors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" disabled={isLoadingPosition} defaultValue={address} required />
            {addressStatus === "error" && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{errorAddress}</p>}
          </div>
          {!address && <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px] z-10">
            <Button type="small" handler={(e) => {
              e.preventDefault();
              dispatch(fetchAddress());
              }}
              disabled={isLoadingPosition}
              >
                GET POSITION
              </Button>
          </span>}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
          className="h-6 w-6 accent-yellow-400 focus:outline-none  focus:ring-yellow-400 focus:ring-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude}, ${position.longitude}` : ""} />
          <Button type="primary" disabled={isSubmitting || isLoadingPosition}>{isSubmitting ? "Processing order..." : `Order now for ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };

  console.log(order);

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us a correct phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
