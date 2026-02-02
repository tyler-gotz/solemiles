import { getApiServer } from "@/api/apiServer"
import { fetcher } from "@/api/fetcher"
import type { Shoe } from "@/types/shoe"
import useSWR from "swr"

export const useShoes = () => {
    const { data, error, isLoading } = useSWR<Shoe[]>(getApiServer() + '/shoes', fetcher)

    return {
        shoes: data,
        isLoading,
        isError: error
    }
}