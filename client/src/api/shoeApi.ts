import type { ShoeFormData } from "@/types/shoe";

export const postShoe = async (url: string, { arg }: { arg: ShoeFormData }) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(arg)
    });

    if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
}