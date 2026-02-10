import { useState } from "react";
import { Plus, Pencil, Trash2, Terminal } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchInput } from "@/components/admin/SearchInput";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ActionButton } from "@/components/admin/ActionButton";
import { Button } from "@/components/ui/button";

interface Setting {
  id: number;
  key: string;
  description: string;
}

const initialSettings: Setting[] = [
  { id: 1, key: "auth_session_timeout", description: "Duration of an active user session." },
];

export default function Settings() {
  const [settings] = useState<Setting[]>(initialSettings);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSettings = settings.filter(
    (setting) =>
      setting.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      setting.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Setting>[] = [
    {
      key: "key",
      header: "Key",
      render: (setting) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted">
            <Terminal className="h-4 w-4 text-muted-foreground" />
          </div>
          <code className="font-mono text-sm text-foreground">{setting.key}</code>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (setting) => <span className="text-muted-foreground">{setting.description}</span>,
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
        title="System Settings"
        description="System management and detailed overview."
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Setting
        </Button>
      </PageHeader>

      <div className="mb-6">
        <SearchInput
          placeholder="Search keys or descriptions..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-md"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredSettings}
        keyExtractor={(setting) => setting.id}
        emptyMessage="No settings found"
      />
    </div>
  );
}
