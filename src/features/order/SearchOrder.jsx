import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!orderNumber) return;
    navigate(`order/${orderNumber}`);
    setOrderNumber("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        className="rounded-full px-2 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 w-28 sm:w-64 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500"
      ></input>
    </form>
  );
}

export default SearchOrder;
