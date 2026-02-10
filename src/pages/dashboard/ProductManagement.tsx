import { useState } from "react";
import { Plus, Eye, Pencil, Trash2, Star, Filter } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchInput } from "@/components/admin/SearchInput";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ActionButton } from "@/components/admin/ActionButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useManagerProduct } from "@/hooks/useManagerProduct";

export default function ProductManagement() {
  const { products } = useManagerProduct();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (stock: number) => {
    if (stock > 20) return { label: "IN STOCK", type: "success" as const };
    if (stock > 0) return { label: "LOW STOCK", type: "warning" as const };
    return { label: "OUT OF STOCK", type: "error" as const };
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Product Management"
        description="System management and detailed overview."
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput
          placeholder="Search name, SKU..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-md flex-1"
        />
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => {
          const stockStatus = getStockStatus(product.stockUnits);
          return (
            <div
              key={product.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-muted">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isFeatured && (
                  <div className="absolute top-3 left-3 p-2 rounded-full bg-warning">
                    <Star className="h-4 w-4 text-warning-foreground fill-current" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <StatusBadge status={stockStatus.label} type={stockStatus.type} />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs font-medium text-primary uppercase tracking-wider">
                  {product.category.name}
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-1">{product.name}</h3>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Pricing</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-foreground">${product.basePrice.toLocaleString()}</span>
                      {product.basePrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.basePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Stock</p>
                    <span
                      className={cn(
                        "text-xl font-bold",
                        product.stockUnits <= 10 ? "text-destructive" : "text-foreground"
                      )}
                    >
                      {product.stockUnits}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
                  <ActionButton icon={Eye} tooltip="View" />
                  <ActionButton icon={Pencil} tooltip="Edit" />
                  <ActionButton icon={Trash2} tooltip="Delete" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
