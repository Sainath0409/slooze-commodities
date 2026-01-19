
"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import ProductTable from "@/components/products/ProductTable";
import { products as initialProducts, Product } from "@/mock/products";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { useAuth } from "@/components/auth/AuthProvider";
import { ROLES } from "@/lib/roles";

export default function ProductsPage() {
    const { session } = useAuth();
    const [products, setProducts] = useState<Product[]>(initialProducts);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        name: "",
        category: "",
        quantity: 0
    });

    const handleUpdate = (updatedProduct: Product) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
        toast.success("Product updated successfully");
    };

    const handleDelete = (id: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");
    };


    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        // Calculate new ID based on existing max ID
        const maxId = products.reduce((max, p) => {
            const numId = parseInt(p.id);
            return !isNaN(numId) && numId > max ? numId : max;
        }, 0);
        const newId = (maxId + 1).toString();

        const productToAdd = {
            id: newId,
            name: newProduct.name || "New Product",
            category: newProduct.category || "General",
            quantity: newProduct.quantity || 0,
        };

        setProducts(prev => [...prev, productToAdd]);
        setIsAddDialogOpen(false);
        setNewProduct({ name: "", category: "", quantity: 0 });
        toast.success("Product added successfully");
    };


    return (
        <RoleGuard allowedRoles={["MANAGER", "STORE_KEEPER"]}>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-3xl font-bold">Products Inventory</h1>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                disabled={session?.role !== ROLES.MANAGER}
                                title={session?.role !== ROLES.MANAGER ? "Only Managers can add new products" : "Add New Product"}
                            >
                                <Plus className="mr-2 h-4 w-4" /> Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent>

                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                                <DialogDescription>Add a new item to your inventory.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAdd}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="new-name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="new-name"
                                            value={newProduct.name}
                                            onChange={(e) =>
                                                setNewProduct({ ...newProduct, name: e.target.value })
                                            }
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="new-category" className="text-right">
                                            Category
                                        </Label>
                                        <Input
                                            id="new-category"
                                            value={newProduct.category}
                                            onChange={(e) =>
                                                setNewProduct({
                                                    ...newProduct,
                                                    category: e.target.value,
                                                })
                                            }
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="new-quantity" className="text-right">
                                            Quantity
                                        </Label>
                                        <Input
                                            id="new-quantity"
                                            type="number"
                                            value={newProduct.quantity}
                                            onChange={(e) =>
                                                setNewProduct({
                                                    ...newProduct,
                                                    quantity: parseInt(e.target.value) || 0,
                                                })
                                            }
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Add Product</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Current Stock</CardTitle>
                        <CardDescription>Manage your product inventory, update stock levels, or remove items.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProductTable products={products} onUpdate={handleUpdate} onDelete={handleDelete} />
                    </CardContent>
                </Card>
            </div>
        </RoleGuard>
    );
}
