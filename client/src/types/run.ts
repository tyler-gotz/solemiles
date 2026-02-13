import type { RunType } from "./runType";

export type RunFormData = {
    shoeId: string;
    date: string;
    distance: number;
    type: RunType;
    notes?: string;
};

export type Run = {
    runId: string;
    shoeId: string;
    date: string;
    distance: number;
    runType: RunType;
    notes?: string;
}