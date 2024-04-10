import CartOverview from "../cart/CartOverview";
import Header from "./Header";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <h1>Content</h1>
        <CartOverview />
      </main>
    </div>
  );
}

export default AppLayout;
