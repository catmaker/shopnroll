"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category, SubCategory } from "@/lib/types";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

interface MainNavProps {
  categories: Category[];
  subCategories: SubCategory[];
}

const MainNav = ({ categories, subCategories }: MainNavProps) => {
  const pathname = usePathname();

  const routes = categories.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    id: route.id,
    active: pathname.startsWith(`/category/${route.id}`),
  }));

  return (
    <NavigationMenu className="w-max ml-4">
      <NavigationMenuList>
        {routes.map((route) => (
          <NavigationMenuItem key={route.href} className="relative group/item">
            <Link
              href={route.href}
              className={cn(
                "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-black bg-transparent",
                route.active ? "text-black" : "text-neutral-500"
              )}
            >
              {route.label}
              <ChevronDownIcon
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-hover/item:rotate-180"
                aria-hidden="true"
              />
            </Link>
            <ul className="hidden group-hover/item:block absolute top-full left-0 w-max p-2 bg-white rounded-md shadow-md">
              {subCategories
                .filter((sub) => sub.categoryId === route.id)
                .map((subCategory) => (
                  <Link
                    href={`/category/${route.id}?subCategoryId=${subCategory.id}`}
                    key={subCategory.id}
                    className="p-2 hover:bg-neutral-100 rounded-sm flex flex-col gap-y-1"
                  >
                    <p className="text-sm">{subCategory.name}</p>
                  </Link>
                ))}
            </ul>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
