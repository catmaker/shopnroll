"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category, SubCategory } from "@/lib/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <NavigationMenu className="w-max ml-4">
      <NavigationMenuList>
        {routes.map((route) => (
          <NavigationMenuItem key={route.href}>
            <NavigationMenuTrigger
              className={cn(
                "text-sm font-medium transition-colors hover:text-black bg-transparent",
                route.active ? "text-black" : "text-neutral-500"
              )}
            >
              {route.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-transparent transition-all duration-50">
              <ul className="grid w-max p-2 bg-transparent">
                {subCategories
                  .filter((sub) => sub.categoryId === route.id)
                  .map((subCategory) => (
                    <li
                      key={subCategory.id}
                      className="p-2 hover:bg-neutral-100 bg-transparent"
                    >
                      {subCategory.name}
                    </li>
                  ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
