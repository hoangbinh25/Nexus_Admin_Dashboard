import { useState } from "react";
import { Upload, Eye, Pencil, Trash2, Download, FileText, File } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ActionButton } from "@/components/admin/ActionButton";
import { Button } from "@/components/ui/button";
import { useManagerDocument } from "@/hooks/useManagerDocument";
import { IDocument } from "@/types/document";

export default function DocumentManagement() {
  const { documents, loading } = useManagerDocument();

  const getFileIcon = (type: string) => {
    if (type.includes("PDF")) return <FileText className="h-5 w-5 text-destructive" />;
    return <File className="h-5 w-5 text-primary" />;
  };

  const columns: Column<IDocument>[] = [
    {
      key: "name",
      header: "Document Name",
      render: (doc) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted">{getFileIcon(doc.fileType || "")}</div>
          <div>
            <p className="font-medium text-foreground">{doc.title}</p>
            <p className="text-xs text-muted-foreground">{doc.fileType}</p>
          </div>
        </div>
      ),
    },
    {
      key: "size",
      header: "Size",
      render: (doc) => <span className="text-muted-foreground">{doc.fileSize}</span>,
    },
    {
      key: "owner",
      header: "Owner",
      render: (doc) => <span className="text-foreground">{doc.owner?.fullName || "Unknown"}</span>,
    },
    {
      key: "updatedAt",
      header: "Updated At",
      render: (doc) => <span className="text-muted-foreground">{doc.updatedAt}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: () => (
        <div className="flex items-center justify-end gap-1">
          <ActionButton icon={Eye} tooltip="View" />
          <ActionButton icon={Pencil} tooltip="Edit" />
          <ActionButton icon={Trash2} tooltip="Delete" />
          <ActionButton icon={Download} tooltip="Download" />
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Document Management"
        description="System management and detailed overview."
      >
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload New
        </Button>
      </PageHeader>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Documents</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          Loading documents...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={documents || []}
          keyExtractor={(doc) => doc.id}
          emptyMessage="No documents found"
        />
      )}
    </div>
  );
}
