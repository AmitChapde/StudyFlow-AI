"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth-client";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer hover:bg-gray-100"
      onClick={logout}
    >
      Logout
    </Button>
  );
}