import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchFormSchema = z.object({
  search: z.string().max(50),
});

type SearchFormSchemaType = z.infer<typeof SearchFormSchema>;

const Search = () => {
  const { register, handleSubmit } = useForm<SearchFormSchemaType>({
    resolver: zodResolver(SearchFormSchema),
  });

  const onSubmit = (data: SearchFormSchemaType) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-blue-300 rounded-full h-10 w-80 ml-2 flex items-center justify-center">
          <MagnifyingGlassIcon className="h-6 w-6" />
          <input
            className="w-5/6 p-1 bg-inherit outline-none placeholder:text-black focus:placeholder:text-transparent"
            placeholder="Szukaj..."
            type="text"
            autoComplete="off"
            {...register("search")}
          />
        </div>
      </form>
    </>
  );
};

export default Search;
