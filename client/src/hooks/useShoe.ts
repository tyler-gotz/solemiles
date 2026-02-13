import { getApiServer } from "@/api/apiServer"
import { fetcher } from "@/api/fetcher"
import type { Shoe } from "@/types/shoe"
import useSWR from "swr"

export const useShoe = (shoeId: string) => {
    const { data, error, isLoading } = useSWR<Shoe>(getApiServer() + `/shoes/${shoeId}`, fetcher)

    return {
        shoe: data,
        isLoading,
        isError: error
    }
}