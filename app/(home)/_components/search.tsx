"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";
import { useRouter } from "next/navigation";




const formSchemma = z.object({
  search: z.string({ required_error: "Campo obrigatório." })
    .trim()
    .min(1, "Campo obrigatório")
})

interface SearchProps {
  defaultValues?: z.infer<typeof formSchemma>
}

export const Search = ({ defaultValues }: SearchProps) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchemma>>({
    resolver: zodResolver(formSchemma),
    defaultValues,
  })

  const handleSubmit = (data: z.infer<typeof formSchemma>) => {
    router.push(`/barbershops?search=${data.search}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form className="flex gap-4 w-full" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="w-full" placeholder="Busque por uma barbearia..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="default" type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>
      </Form>
    </div>
  );
};
