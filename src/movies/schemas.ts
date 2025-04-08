import { z } from "zod";
import { parseArray } from "../core/utils";

export const listMoviesQuerySchema = z.object({
    limit: z.optional(z.number({ coerce: true })),
    // more filter may be added in future
    filters: z.preprocess(
        (val) => parseArray(val),
        z.array(z.enum(["mostPopular"])),
    ),
});
