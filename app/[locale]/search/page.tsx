"use client";
import { useSearchParams } from "next/navigation";
import SearchPage from "@/sections/Search/SearchPage";
// import { search } from "./actions";
// import { useEffect, useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const searchString = searchParams.get("q") || "";

  // const [result, setResult] = useState<string[]>([]);

  // useEffect(() => {
  //   const res = async () => {
  //     const wow = await search(searchString);
  //     setResult(wow);
  //   };
  //   res();
  // }, [searchString]);

  return <SearchPage search={searchString} />;
}
