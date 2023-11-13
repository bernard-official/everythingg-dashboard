'use client'
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export function Search({placeholder}: {placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
 //const { replace } = useRouter();

  function handleSearch(term: string){
    const params = new URLSearchParams(searchParams)
    if(term) {
      params.set('query', term);
    } else {
      params.delete('query')
    }
   //replace(`${pathname}?${params.toString()}`)
    console.log(term)
  }
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}
