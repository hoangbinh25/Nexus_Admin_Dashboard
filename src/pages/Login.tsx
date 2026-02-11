import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ERouter } from "@/enums/route";
import { useAuth } from "@/context/AuthContext";
import { IAuthRequest } from "@/types/auth";

import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("admin@nexus.com");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: IAuthRequest = {
      email,
      password
    }

    const success = await login(data);

    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome back to Nexus Admin!",
        variant: "default",
      });
      navigate({ to: `${ERouter.DASHBOARD_OVERVIEW}` });
    } else {
      toast({
        title: "Login failed",
        description: "Please check your email and password and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
            <span className="text-primary-foreground font-bold text-3xl">N</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Nexus Admin</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your system</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nexus.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="flex items-center justify-between text-sm">
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
            <span className="text-border">|</span>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Need help?
            </a>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          © 2024 Nexus Systems Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
