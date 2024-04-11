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
      ></input>
    </form>
  );
}

export default SearchOrder;
