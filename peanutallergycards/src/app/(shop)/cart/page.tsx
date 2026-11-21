import type { Metadata } from "next";
import { CartView } from "@/components/shop/cart-view";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false },
};

const CartPage = () => (
  <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:pt-14">
    <h1 className="font-serif text-5xl tracking-tight sm:text-6xl">
      Your cart
    </h1>
    <div className="mt-10">
      <CartView />
    </div>
  </main>
);

export default CartPage;
