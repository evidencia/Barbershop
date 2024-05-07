import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export const BookingItem = () => {
  return (
    <Card>
      <CardContent className="flex px-0 py-0">
        <div className="flex flex-[3] flex-col gap-2 py-5 pl-5">
          <Badge className="w-fit bg-[#221C3D] text-primary hover:bg-[#221C3D]">
            Confirmado
          </Badge>
          <h2 className="font-bold">Corte de cabelo</h2>
          <div className="flex items-center gap-2">
            <Avatar className="">
              <AvatarImage src="https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png" />
              <AvatarFallback>E</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Hold scool</h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
          <p className="text-sm capitalize">Maio</p>
          <p className="text-2xl">01</p>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
};
