import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../reducers/hooks";
import { fetchUserData } from "../../reducers/userReducer";

const SearchFormSchema = z.object({
  query: z.string().max(50),
});

type SearchFormSchemaType = z.infer<typeof SearchFormSchema>;

type SearchResult = {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
};

const Search = () => {
  const { register, handleSubmit, watch, reset } =
    useForm<SearchFormSchemaType>({
      resolver: zodResolver(SearchFormSchema),
    });
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

  const onSubmit = async (s: SearchFormSchemaType) => {
    if (s.query.length === 0) return setSearchResult([]);

    try {
      const { data } = await axios.get("/api/search", {
        params: { query: s.query },
      });
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      setSearchResult([]);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const search = watch("query");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const searchResultClickHandler = (id: string) => async () => {
    reset();
    await dispatch(fetchUserData(id));
    navigate(`/user/${id}`);
  };

  const blurHandler = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

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
      <form>
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
            onBlur={blurHandler}
          />
        </div>
      </form>
      {searchResult.length > 0 && isFocused && (
        <ul className="fixed top-11 bg-violet-300 ml-14 w-80 rounded-b-lg">
          {searchResult.map((res, index) => {
            return (
              <Link
                to={`/user/${res.id}`}
                key={res.id}
                onClick={searchResultClickHandler(res.id)}
              >
                <li className="flex items-center p-2 gap-4">
                  <img
                    className="rounded-full"
                    src={`${res.avatar}/-/scale_crop/40x40/`}
                    alt="avatar"
                  />
                  <p>
                    {res.firstName} {res.lastName}
                  </p>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Search;
