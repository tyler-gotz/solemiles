import { getApiServer } from "@/api/apiServer"
import { fetcher } from "@/api/fetcher"
import type { Run } from "@/types/run"
import useSWR from "swr"

export const useRunsByShoeId = (shoeId: string) => {
    const { data, error, isLoading } = useSWR<Run[]>(getApiServer() + `/runs?shoeId=${shoeId}`, fetcher)

    return {
        runs: data,
        isLoading,
        isError: error
    }
}