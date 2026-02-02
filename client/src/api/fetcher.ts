export async function fetcher<T>(
    input: RequestInfo,
    init?: RequestInit
): Promise<T> {
    const response = await fetch(input, init);
    if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data
}