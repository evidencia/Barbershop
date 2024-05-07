import Image from "next/image";

import { Menu } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between px-5 py-5">
        <Image src="/logo.png" alt="fsw barber" height={22} width={120} />
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </CardContent>
    </Card>
  );
};
