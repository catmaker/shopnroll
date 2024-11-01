"use client";
import { useState, useEffect } from "react";
import {
  Product,
  Image,
  Category,
  Size,
  Color,
  SubCategory,
  ProductColor,
  ProductSize,
} from "@prisma/client";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  subCategoryId: z.string().min(1),
  colorId: z.string().min(1),
  productColors: z.array(z.string()).default([]),
  productSizes: z.array(z.string()).default([]),
  sizeId: z.string().min(1),
  description: z.string().optional().default(""),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  images: z
    .object({
      url: z.string(),
    })
    .array(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        productColors: ProductColor[];
        productSizes: ProductSize[];
      })
    | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  subCategories: SubCategory[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
  subCategories,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData ? "Edit a Product" : "Add a new Product";
  const toastMessage = initialData ? "Product updated" : "Product created";
  const action = initialData ? "Save changes" : "Create";
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData.price)),
          description: initialData.description || undefined,
          productColors: initialData.productColors?.map((pc) => pc.colorId),
          productSizes: initialData.productSizes?.map((ps) => ps.sizeId),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          subCategoryId: "",
          colorId: "",
          productColors: [],
          productSizes: [],
          sizeId: "",
          description: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const selectedCategoryId = form.watch("categoryId");

  const filteredSubCategories = subCategories.filter(
    (subCategory) => subCategory.categoryId === selectedCategoryId
  );

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push("/");
      toast.success("Product deleted");
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this product first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
            Delete Product
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    onChange={(url) => {
                      append({ url });
                    }}
                    onRemove={(url) => {
                      const index = fields.findIndex((f) => f.url === url);
                      if (index !== -1) remove(index);
                    }}
                    value={fields.map((f) => f.url)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="10000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a category"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
                  <Select
                    disabled={loading || !form.watch("categoryId")}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            filteredSubCategories.length > 0
                              ? "Select a sub category"
                              : "No sub categories found"
                          }
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredSubCategories.map((subCategory) => (
                        <SelectItem key={subCategory.id} value={subCategory.id}>
                          {subCategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a size"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productSizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Sizes (Optional)</FormLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <div
                        key={size.id}
                        onClick={() => {
                          const values = new Set(field.value || []);
                          if (values.has(size.id)) {
                            values.delete(size.id);
                          } else {
                            values.add(size.id);
                          }
                          field.onChange(Array.from(values));
                        }}
                        className={`
              flex items-center justify-center p-2 rounded-md cursor-pointer border
              ${
                field.value?.includes(size.id)
                  ? "border-black"
                  : "border-gray-200"
              }
            `}
                      >
                        <span className="text-center">{size.name}</span>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Color</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a main color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color.value }}
                            />
                            {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productColors"
              render={({ field }) => {
                console.log("Selected colors:", field.value);
                console.log("Available colors:", colors);

                return (
                  <FormItem>
                    <FormLabel>Additional Colors (Optional)</FormLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {colors.map((color) => (
                        <div
                          key={color.id}
                          onClick={() => {
                            const values = new Set(field.value || []);
                            console.log("Clicked color:", color.id);
                            if (values.has(color.id)) {
                              values.delete(color.id);
                            } else {
                              values.add(color.id);
                            }
                            const newValues = Array.from(values);
                            console.log("New selected colors:", newValues);
                            field.onChange(newValues);
                          }}
                          className={`
                flex items-center justify-center gap-2 p-2 rounded-md cursor-pointer border
                ${
                  field.value?.includes(color.id)
                    ? "border-black"
                    : "border-gray-200"
                }
              `}
                        >
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color.value }}
                          />
                          <span className="text-center">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      Display this product on the featured section of your
                      store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in your store.
                      Archived products are hidden from customers.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default ProductForm;
