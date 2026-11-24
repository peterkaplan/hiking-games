import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/photo";
import { buttonPrimary } from "@/components/shop/bits";
import emptyPlateShell from "@/images/empty-plate-shell.webp";
import ShopLayout from "./(shop)/layout";

export const metadata: Metadata = { title: "Page not found" };

const NotFound = () => (
  <ShopLayout>
    <main className="mx-auto max-w-4xl px-4 pt-10 text-center sm:px-6 lg:pt-14">
      <Photo
        alt="An empty white plate with a cracked, empty peanut shell in front of it"
        className="border-shop-ink aspect-[16/9] w-full rounded-[28px] border-2 object-cover"
        priority
        sizes="(min-width: 896px) 896px, 100vw"
        src={emptyPlateShell}
      />
      <h1 className="mt-10 font-serif text-5xl tracking-tight sm:text-6xl">
        Nothing here. Not even peanuts.
      </h1>
      <p className="mt-4 text-xl">
        That page doesn&apos;t exist, or it has moved.
      </p>
      <Link className={`${buttonPrimary} mt-8`} href="/">
        Back to the shop
      </Link>
    </main>
  </ShopLayout>
);

export default NotFound;
