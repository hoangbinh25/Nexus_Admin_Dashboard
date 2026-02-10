import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, AlertTriangle, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserFormValues, createUserSchema } from "@/schema/userSchema";
import { toast } from "sonner";

import { PageHeader } from "@/components/admin/PageHeader";
import { SearchInput } from "@/components/admin/SearchInput";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { UserAvatar } from "@/components/admin/UserAvatar";
import { ActionButton } from "@/components/admin/ActionButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useManagerUsers } from "@/hooks/useManagerUsers";
import { ICreateUserRequest, IUser } from "@/types/user";
import { generatePassword } from "@/utils/genPassword";
import { updateUserService } from "@/services/userService";

export default function UserManagement() {
  const { userId } = useParams();
  const { users, loading, createUser, getUserById, updateUser, deleteUser } = useManagerUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  const [displayUsers, setDisplayUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  useEffect(() => {
    const handleFetchInitial = async () => {
      if (userId) {
        if (displayUsers.length !== 1 || displayUsers[0].id !== userId) {
          const user = await getUserById(userId);
          if (user) {
            setDisplayUsers([user]);
          } else {
            setDisplayUsers([]);
            toast.error("User not found");
          }
        }
      } else {
        if (displayUsers !== users) {
          setDisplayUsers(users || []);
        }
      }
    };

    handleFetchInitial();
  }, [userId, users, getUserById, displayUsers]);

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "ADMIN",
      status: "Active",
    }
  });

  const onSubmit = async (data: CreateUserFormValues) => {
    try {
      if (selectedUser) {
        const result = await updateUser(selectedUser.id, data as ICreateUserRequest);
        if (result) {
          toast.success("User updated successfully");
          setIsDialogOpen(false);
          form.reset();
        } else {
          toast.error("Failed to update user");
        }
      } else {
        const result = await createUser(data as ICreateUserRequest);
        if (result) {
          toast.success("User created successfully");
          setIsDialogOpen(false);
          form.reset();
        } else {
          toast.error("Failed to create user");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleOpenAdd = () => {
    setSelectedUser(null);
    form.reset({
      fullName: "",
      email: "",
      password: "",
      role: "ADMIN",
      status: "Active",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (user: IUser) => {
    setSelectedUser(user);
    form.reset({
      fullName: user.fullName,
      email: user.email,
      password: "",
      role: user.role as any,
      status: user.status as any,
    });
    setIsDialogOpen(true);
  };

  const handleOpenDelete = (user: IUser) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const result = await deleteUser(userToDelete.id);
      if (result) {
        toast.success("User deleted successfully");
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleGeneratePassword = () => {
    const password = generatePassword();
    form.setValue("password", password, { shouldValidate: true });
  };

  const filteredUsers = (displayUsers || []).filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<IUser>[] = [
    {
      key: "user",
      header: "User",
      render: (user) => <UserAvatar name={user.fullName} email={user.email} />,
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <span className="px-3 py-1 text-xs font-medium bg-muted rounded-md text-foreground">
          {user.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <StatusBadge
          status={user.status}
          type={user.status === "Active" ? "success" : "default"}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (user) => (
        <div className="flex items-center justify-end gap-1">
          <ActionButton
            icon={Pencil}
            tooltip="Edit"
            onClick={() => handleOpenEdit(user)}
          />
          {user.role !== "SUPER ADMIN" && (
            <ActionButton
              icon={Trash2}
              tooltip="Delete"
              onClick={() => handleOpenDelete(user)}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="User Management"
        description="System management and detailed overview."
      >
        <Button onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </PageHeader>

      <div className="mb-6">
        <SearchInput
          placeholder="Search users..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-md"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        keyExtractor={(user) => user.id}
        emptyMessage="No users found"
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                {selectedUser ? (
                  <Pencil className="h-5 w-5 text-primary" />
                ) : (
                  <Plus className="h-5 w-5 text-primary" />
                )}
              </div>
              <DialogTitle>{selectedUser ? "Edit User" : "Create New User"}</DialogTitle>
            </div>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-xs uppercase tracking-wider text-muted-foreground">
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="e.g. John Doe"
                {...form.register("fullName")}
              />
              {form.formState.errors.fullName && (
                <p className="text-xs text-destructive">{form.formState.errors.fullName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@nexus.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Role
                </Label>
                <Select
                  key={selectedUser ? `edit-${selectedUser.role}` : "create-role"}
                  defaultValue={form.getValues("role")}
                  onValueChange={(value) => form.setValue("role", value as any, { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="SUPER ADMIN">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.role && (
                  <p className="text-xs text-destructive">{form.formState.errors.role.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Status
                </Label>
                <Select
                  key={selectedUser ? `edit-${selectedUser.status}` : "create-status"}
                  defaultValue={form.getValues("status")}
                  onValueChange={(value) => form.setValue("status", value as any, { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.status && (
                  <p className="text-xs text-destructive">{form.formState.errors.status.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">
                Password
              </Label>
              <div className="flex gap-2">
                <Input
                  id="password"
                  type="password"
                  placeholder={selectedUser ? "Leave blank to keep current" : "Enter password"}
                  className="flex-1"
                  {...form.register("password")}
                />
                <Button type="button" variant="outline" onClick={handleGeneratePassword}>
                  Auto-Gen
                </Button>
              </div>
              {form.formState.errors.password && (
                <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Discard
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (selectedUser ? "Updating..." : "Registering...") : (selectedUser ? "Update User" : "Register User")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px] p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold">Delete User</DialogTitle>
              <p className="text-muted-foreground">
                Are you sure you want to delete <span className="font-semibold text-foreground">{userToDelete?.fullName}</span>?
                <br />
                This action cannot be undone.
              </p>
            </div>

            <div className="flex flex-col w-full gap-2 pt-4">
              <Button
                variant="destructive"
                size="lg"
                className="w-full font-semibold"
                onClick={confirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="w-full text-muted-foreground hover:text-foreground"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
