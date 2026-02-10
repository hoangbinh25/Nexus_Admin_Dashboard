import { useState } from "react";
import { Plus, Pencil, Trash2, Layers } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchInput } from "@/components/admin/SearchInput";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ActionButton } from "@/components/admin/ActionButton";
import { Button } from "@/components/ui/button";
import { useManagerCategory } from "@/hooks/useManagerCategory";
import { ICategory } from "@/types/category";

export default function CategoryManagement() {
  const { categories } = useManagerCategory();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = (categories || []).filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<ICategory>[] = [
    {
      key: "name",
      header: "Category Name",
      render: (cat) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Layers className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-foreground">{cat.name}</span>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (cat) => <span className="text-muted-foreground">{cat.description}</span>,
    },
    {
      key: "products",
      header: "Products",
      render: (cat) => <span className="text-muted-foreground">{cat.productCount} Items</span>,
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: () => (
        <div className="flex items-center justify-end gap-1">
          <ActionButton icon={Pencil} tooltip="Edit" />
          <ActionButton icon={Trash2} tooltip="Delete" />
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Category Management"
        description="System management and detailed overview."
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </PageHeader>

      <div className="mb-6">
        <SearchInput
          placeholder="Search categories..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-md"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredCategories}
        keyExtractor={(cat) => cat.id}
        emptyMessage="No categories found"
      />
    </div>
  );
}
