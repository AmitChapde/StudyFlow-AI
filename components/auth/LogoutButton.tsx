"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth-client";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer text-red-700 hover:bg-gray-300"
      onClick={logout}
    >
      Logout
    </Button>
  );
}