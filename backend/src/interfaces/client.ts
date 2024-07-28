import { z } from 'zod';

export enum FundingSource {
    ndis = "NDIS",
    hcp = "HCP",
    chsp = "CHSP",
    dva = "DVA",
    hacc = "HACC"
}

export const createClientParams = z.object({
    name: z.string(),
    dob: z.date(),
    mainLanguage: z.string(),
    secondaryLanguage: z.string(),
    fundingSource: z.nativeEnum(FundingSource),
});
export type CreateClientParams = z.infer<typeof createClientParams>;

export const getClientParams = z.object({
    id: z.string().transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error('Invalid ID format');
      }
      return parsed;
    }),
  });
export type GetClientParams = z.infer<typeof getClientParams>;

export const updateClientParams = z.object({
    name: z.string(),
    dob: z.date(),
    mainLanguage: z.string(),
    secondaryLanguage: z.string().optional(),
    fundingSource: z.nativeEnum(FundingSource),
});
export type UpdateClientParams = z.infer<typeof updateClientParams>;