import { redirect } from "next/navigation";
import { BarbershopItem } from "../(home)/_components/barbershop-item";
import { Header } from "../_components/header";
import { db } from "../_lib/prisma";
<<<<<<< HEAD
import { Search } from "../(home)/_components/search";
=======
>>>>>>> 045c30e68b4bafb05f05d4ec5be7997ec1b2183b

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {

  if (!searchParams.search) {
    return redirect("/")
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive"
      }
    }
  })

  return (
    <>
      <Header />



      <div className="px-5 py-6 flex flex-col gap-6">
        <Search defaultValues={{
          search: searchParams.search
        }}
        />

        <h1 className="text-gray-400 font-bold text-xs uppercase">Resultado para &quot;{searchParams.search}&quot;</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 px-5">
        {barbershops.map((barbershop) => (
          <div key={barbershop.id} className="w-full">
            <BarbershopItem barbershop={barbershop} />
          </div>
        ))}
      </div>

    </>
  );
}

export default BarbershopsPage;