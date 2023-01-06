import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";

const SearchFormSchema = z.object({
  query: z.string().max(50),
});

type SearchFormSchemaType = z.infer<typeof SearchFormSchema>;

type SearchResult = {
  name: string;
  surname: string;
  email: string;
};

const Search = () => {
  const { register, handleSubmit, watch } = useForm<SearchFormSchemaType>({
    resolver: zodResolver(SearchFormSchema),
  });
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);

  const onSubmit = async (data: SearchFormSchemaType) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/search`, data);
      setSearchResult(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setSearchResult([]);
        return;
      }
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const search = watch("query");

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    const subscription = watch((data) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 500);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, handleSubmit]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`bg-violet-300 ml-2 h-10 w-80 flex items-center justify-center ${
            searchResult.length === 0 || !isFocused
              ? "rounded-full"
              : "rounded-t-lg"
          }`}
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
          <input
            className="w-5/6 p-1 bg-inherit outline-none placeholder:text-black focus:placeholder:text-transparent"
            placeholder="Szukaj..."
            type="text"
            autoComplete="off"
            {...register("query")}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </form>
      {searchResult.length > 0 && isFocused && (
        <ul className="fixed top-11 bg-violet-300 ml-14 w-80 rounded-b-lg">
          {searchResult.map((res, index) => {
            return (
              <li className="text-center p-2" key={index}>
                {res.name} {res.surname}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Search;
