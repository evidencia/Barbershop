"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import BookingInfo from "./booking-info";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

export const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isPast(booking.date);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucess");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full cursor-pointer">
          <CardContent className="flex px-0 py-0">
            <div className="flex flex-[3] flex-col gap-2 py-5 pl-5">
              <Badge
                variant={isBookingConfirmed ? "secondary" : "default"}
                className="my-3 w-fit"
              >
                {isBookingConfirmed ? "Finalizado" : "Confirmado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>
              <div className="flex items-center gap-2">
                <Avatar className="">
                  <AvatarImage src="https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png" />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="border-b border-solid border-secondary px-5 pb-6 text-left">
          <SheetTitle>Informaçoes da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative mt-6 h-[180px] w-full">
            <Image
              src="/barbershop-map.png"
              fill
              alt={booking.barbershop.name}
              style={{ objectFit: "contain" }}
            />

            <div className="absolute bottom-4 left-0 w-full px-5">
              <Card>
                <CardContent className="flex gap-2 p-3">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="overflow-hidden text-ellipsis text-nowrap text-xs">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? "secondary" : "default"}
            className="my-3 w-fit"
          >
            {isBookingConfirmed ? "Finalizado" : "Confirmado"}
          </Badge>

          <BookingInfo booking={booking} />

          <SheetFooter className="mt-6 flex-row gap-3">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={isBookingConfirmed || isDeleteLoading}
                  variant="destructive"
                  className="w-full"
                >
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja mesmo cancelar essa reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será possível reverter essa ação.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="mt-0 w-full">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-full"
                    disabled={isDeleteLoading}
                    onClick={handleCancelClick}
                  >
                    {isDeleteLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
