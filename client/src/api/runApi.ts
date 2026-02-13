import type { RunFormData } from "@/types/run";

export const postRun = async (url: string, { arg }: { arg: RunFormData }) => {
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