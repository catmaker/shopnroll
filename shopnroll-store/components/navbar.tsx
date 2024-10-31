import React from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import getSubCategories from "@/actions/get-subcategories";
import NavActions from "@/components/nav-actions";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();
  const subCategories = await getSubCategories();
  return (
    <div className="border-b border-gray-200">
      <Container>
        <div className="flex items-center h-16 sm:px-6 lg:px-8">
          <Link href="/" className="ml-4 lg:ml-0 gap-x-2">
            <p className="text-2xl font-bold">StylePoint</p>
          </Link>
          <MainNav categories={categories} subCategories={subCategories} />
          <div className="ml-auto flex items-center gap-x-4">
            <NavActions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
