"use client";
import React, { useState } from "react";
import { Size } from "@/lib/types";
import { Color } from "@/lib/types";
import Button from "@/components/ui/button";
import { Filter as FilterIcon, Plus, X } from "lucide-react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Filter from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}
const MobileFilters = ({ sizes, colors }: MobileFiltersProps) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={onOpen}
        className="flex items-center gap-x-2 lg:hidden mb-6 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
      >
        Filters
        <Plus size={20} />
      </Button>
      <Dialog
        as="div"
        open={open}
        onClose={onClose}
        className="relative z-40 lg:hidden"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            className={`
              relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl 
              transition-all duration-300 ease-in-out transform
              ${open ? "translate-x-0" : "translate-x-full"}
              sm:max-w-md sm:px-6
            `}
          >
            <div className="flex items-center justify-end px-4">
              <Button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="px-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
