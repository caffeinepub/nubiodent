import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import {
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  PackageSearch,
  Pencil,
  Plus,
  ShieldCheck,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { CATEGORIES, SAMPLE_PRODUCTS } from "../data/sampleProducts";
import { useActor } from "../hooks/useActor";
import { useImageUpload } from "../hooks/useImageUpload";
import { useAllProducts } from "../hooks/useQueries";

const ADMIN_USERNAME = "nubiodent";
const ADMIN_PASSWORD = "nubiodent@2024";

const EMPTY_FORM = {
  name: "",
  description: "",
  category: "Dental Chairs",
  price: "",
  contactForPrice: false,
  imageUrl: "",
  featured: false,
  inStock: true,
  rating: "4.5",
};

type FormState = typeof EMPTY_FORM;

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError("");
      onLogin();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-50 flex items-center justify-center p-4"
      data-ocid="admin.page"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Admin Panel
          </h1>
          <p className="text-slate-500 text-sm">
            Sign in to manage your product catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="admin-username">Username</Label>
            <Input
              id="admin-username"
              data-ocid="admin.input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Password</Label>
            <div className="relative">
              <Input
                id="admin-password"
                data-ocid="admin.input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="submit"
            data-ocid="admin.primary_button"
            className="w-full"
            size="lg"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

function ProductFormDialog({
  open,
  onOpenChange,
  editProduct,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editProduct: Product | null;
  onSaved: () => void;
}) {
  const { actor } = useActor();
  const { uploadImage, uploading, progress } = useImageUpload();
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<FormState>(() => {
    if (editProduct) {
      return {
        name: editProduct.name,
        description: editProduct.description,
        category: editProduct.category,
        price: editProduct.price === 0 ? "" : String(editProduct.price),
        contactForPrice: editProduct.price === 0,
        imageUrl: editProduct.imageUrl,
        featured: editProduct.featured,
        inStock: editProduct.inStock,
        rating: String(editProduct.rating),
      };
    }
    return EMPTY_FORM;
  });

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      setForm(
        editProduct
          ? {
              name: editProduct.name,
              description: editProduct.description,
              category: editProduct.category,
              price: editProduct.price === 0 ? "" : String(editProduct.price),
              contactForPrice: editProduct.price === 0,
              imageUrl: editProduct.imageUrl,
              featured: editProduct.featured,
              inStock: editProduct.inStock,
              rating: String(editProduct.rating),
            }
          : EMPTY_FORM,
      );
      setImageFile(null);
    }
    onOpenChange(v);
  };

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!actor) return;
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Description is required");
      return;
    }

    setSaving(true);
    try {
      let imageUrl = form.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      const price = form.contactForPrice
        ? 0
        : Number.parseFloat(form.price) || 0;
      const rating = Number.parseFloat(form.rating) || 4.5;

      if (editProduct) {
        await actor.updateProduct(
          editProduct.id,
          form.name,
          form.description,
          form.category,
          price,
          imageUrl,
          form.featured,
          rating,
          form.inStock,
        );
        toast.success(`${form.name} updated successfully`);
      } else {
        await actor.addProduct(
          form.name,
          form.description,
          form.category,
          price,
          imageUrl,
          form.featured,
          rating,
          form.inStock,
        );
        toast.success(`${form.name} added successfully`);
      }
      onSaved();
      handleOpenChange(false);
    } catch (err) {
      toast.error("Failed to save product. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const isBusy = saving || uploading;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="admin.dialog"
      >
        <DialogHeader>
          <DialogTitle>
            {editProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {editProduct
              ? "Update product details below."
              : "Fill in the details for the new product."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="prod-name">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="prod-name"
                data-ocid="admin.input"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. ProComfort Elite Chair"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prod-category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => set("category", v)}
              >
                <SelectTrigger id="prod-category" data-ocid="admin.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="prod-desc">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="prod-desc"
              data-ocid="admin.textarea"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the product..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="prod-price">Price (₹)</Label>
              <Input
                id="prod-price"
                data-ocid="admin.input"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                disabled={form.contactForPrice}
                placeholder="e.g. 4299.99"
              />
              <div className="flex items-center gap-2 mt-1">
                <Checkbox
                  id="contact-price"
                  data-ocid="admin.checkbox"
                  checked={form.contactForPrice}
                  onCheckedChange={(v) => set("contactForPrice", !!v)}
                />
                <Label
                  htmlFor="contact-price"
                  className="font-normal text-sm cursor-pointer"
                >
                  Contact for price
                </Label>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prod-rating">Rating (0-5)</Label>
              <Input
                id="prod-rating"
                data-ocid="admin.input"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={(e) => set("rating", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Product Image</Label>
            {form.imageUrl && !imageFile && (
              <div className="mb-2">
                <img
                  src={form.imageUrl}
                  alt="Current"
                  className="w-24 h-24 object-cover rounded-lg border border-slate-200"
                />
                <p className="text-xs text-slate-400 mt-1">Current image</p>
              </div>
            )}
            {imageFile && (
              <div className="mb-2">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border border-slate-200"
                />
                <p className="text-xs text-slate-400 mt-1">
                  New image selected
                </p>
              </div>
            )}
            <Input
              id="prod-image-file"
              data-ocid="admin.upload_button"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="cursor-pointer"
            />
            {!imageFile && (
              <>
                <Label
                  htmlFor="prod-image-url"
                  className="text-xs text-slate-500"
                >
                  Or paste an image URL:
                </Label>
                <Input
                  id="prod-image-url"
                  data-ocid="admin.input"
                  value={form.imageUrl}
                  onChange={(e) => set("imageUrl", e.target.value)}
                  placeholder="https://... or /assets/..."
                />
              </>
            )}
            {uploading && (
              <div
                className="text-xs text-slate-500"
                data-ocid="admin.loading_state"
              >
                <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                Uploading image... {progress}%
              </div>
            )}
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="prod-featured"
                data-ocid="admin.checkbox"
                checked={form.featured}
                onCheckedChange={(v) => set("featured", !!v)}
              />
              <Label
                htmlFor="prod-featured"
                className="font-normal cursor-pointer"
              >
                Featured
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="prod-instock"
                data-ocid="admin.checkbox"
                checked={form.inStock}
                onCheckedChange={(v) => set("inStock", !!v)}
              />
              <Label
                htmlFor="prod-instock"
                className="font-normal cursor-pointer"
              >
                In Stock
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            data-ocid="admin.cancel_button"
            onClick={() => handleOpenChange(false)}
            disabled={isBusy}
          >
            Cancel
          </Button>
          <Button
            data-ocid="admin.save_button"
            onClick={handleSave}
            disabled={isBusy}
          >
            {isBusy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : editProduct ? (
              "Save Changes"
            ) : (
              "Add Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AdminPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: backendProducts, isLoading } = useAllProducts();

  const [loggedIn, setLoggedIn] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : SAMPLE_PRODUCTS;

  const handleAddNew = () => {
    setEditProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget || !actor) return;
    setDeleting(true);
    try {
      await actor.deleteProduct(deleteTarget.id);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
      toast.success(`${deleteTarget.name} deleted`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  const handleSaved = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    queryClient.invalidateQueries({ queryKey: ["featured-products"] });
  };

  return (
    <div className="min-h-screen bg-slate-50" data-ocid="admin.page">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900">Admin Panel</h1>
              <p className="text-xs text-slate-400">Product Management</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            data-ocid="admin.secondary_button"
            onClick={() => setLoggedIn(false)}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Products</h2>
            <p className="text-sm text-slate-500">
              {isLoading ? "Loading..." : `${products.length} products total`}
            </p>
          </div>
          <Button
            data-ocid="admin.primary_button"
            onClick={handleAddNew}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="admin.loading_state">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center" data-ocid="admin.empty_state">
              <PackageSearch className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No products yet</p>
              <p className="text-slate-400 text-sm">
                Click "Add New Product" to get started.
              </p>
            </div>
          ) : (
            <Table data-ocid="admin.table">
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, idx) => (
                  <TableRow
                    key={String(product.id)}
                    data-ocid={`admin.item.${idx + 1}`}
                  >
                    <TableCell>
                      <img
                        src={
                          product.imageUrl ||
                          "/assets/generated/product-dental-chair.dim_400x400.jpg"
                        }
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border border-slate-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/generated/product-dental-chair.dim_400x400.jpg";
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-slate-800 max-w-[200px]">
                      <span className="line-clamp-1">{product.name}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700">
                      {product.price === 0 ? (
                        <span className="text-xs text-slate-500 italic">
                          Contact for price
                        </span>
                      ) : (
                        <span>₹{product.price.toLocaleString("en-IN")}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.inStock ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                          In Stock
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-slate-400 text-xs"
                        >
                          Out of Stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.featured ? (
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ) : (
                        <Star className="h-4 w-4 text-slate-200" />
                      )}
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      {product.rating.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          data-ocid={`admin.edit_button.${idx + 1}`}
                          onClick={() => handleEdit(product)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          data-ocid={`admin.delete_button.${idx + 1}`}
                          onClick={() => setDeleteTarget(product)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/5 border-destructive/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        editProduct={editProduct}
        onSaved={handleSaved}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="admin.cancel_button"
              disabled={deleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.confirm_button"
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
