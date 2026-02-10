import { useState } from "react";
import { Plus, ExternalLink, Pencil, Trash2, FileCode } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchInput } from "@/components/admin/SearchInput";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ActionButton } from "@/components/admin/ActionButton";
import { Button } from "@/components/ui/button";
import { useManagerPage } from "@/hooks/useManagerPage";
import { IPage } from "@/types/page";

export default function ContentPages() {
  const { pages } = useManagerPage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPages = (pages || []).filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<IPage>[] = [
    {
      key: "content",
      header: "Page Content",
      render: (page) => (
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-muted">
            <FileCode className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">{page.title}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span>🌐</span> {page.slug}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (page) => (
        <StatusBadge
          status={page.status}
          type={page.status === "PUBLISHED" ? "success" : "default"}
        />
      ),
    },
    {
      key: "history",
      header: "History",
      render: (page) => (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            <span className="text-foreground">📅</span> CREATED: {page.createdAt}
          </p>
          <p className="text-xs text-primary">
            <span>✏️</span> UPDATED: {page.updatedAt}
          </p>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: () => (
        <div className="flex items-center justify-end gap-1">
          <ActionButton icon={ExternalLink} tooltip="View" />
          <ActionButton icon={Pencil} tooltip="Edit" />
          <ActionButton icon={Trash2} tooltip="Delete" />
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Content Pages"
        description="System management and detailed overview."
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Page
        </Button>
      </PageHeader>

      <div className="mb-6">
        <SearchInput
          placeholder="Search by title or slug..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-md"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredPages}
        keyExtractor={(page) => page.id}
        emptyMessage="No pages found"
      />
    </div>
  );
}
