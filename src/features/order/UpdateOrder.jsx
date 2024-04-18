import { useFetcher } from "react-router-dom";
import Button from "../ui/Button"
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="PATCH" className="text-right">
            <Button type="primary">Make priority</Button>
        </fetcher.Form>
    )
}

export async function action({ params }) {
    const updatedData = {priority: true};
    await updateOrder(params.orderId, updatedData)
    return null;
    // const order = {
    //   ...data,
    //   priority: data.priority === "true",
    //   cart: JSON.parse(data.cart),
    // };
  
    // const errors = {};
  
    // if (!isValidPhone(order.phone)) {
    //   errors.phone =
    //     "Please give us a correct phone number. We might need it to contact you.";
    // }
  
    // if (Object.keys(errors).length > 0) {
    //   return errors;
    // }
  
    // const newOrder = await createOrder(order);
  
    // return redirect(`/order/${newOrder.id}`);
  }

export default UpdateOrder;


  

