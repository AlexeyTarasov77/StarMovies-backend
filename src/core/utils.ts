import { FailedResponse, SortOrder, SuccededResponse } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseArray = <T>(arrLike: any, castCallback?: (el: any) => T): T[] => {
    if (arrLike === undefined) return [];
    const arr = Array.isArray(arrLike)
        ? arrLike
        : [arrLike];
    if (castCallback) {
        return arr.map(castCallback);
    }
    return arr;
};

export const getFailedResponse = (
    message: string,
): FailedResponse => ({ success: false, message });

export const getSuccededResponse = <T>(data: T): SuccededResponse<T> => ({
    success: true,
    data,
});

export const getSortMapping = (sortColumns: string[]): Record<string, SortOrder> => {
    const res: Record<string, SortOrder> = {};
    sortColumns.forEach(col => {
        let direction = SortOrder.ASC;
        if (col[0] == "-") {
            col = col.slice(1);
            direction = SortOrder.DESC;
        }
        res[col] = direction;
    });
    return res;
};

