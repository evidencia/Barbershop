"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import SideMenu from "./side-menu";

export const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between px-5 py-5">
        <Link href="/">
          <Image src="/logo.png" alt="fsw barber" height={22} width={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Menu size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};
