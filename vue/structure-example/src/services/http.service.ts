import type { ApiEnvelope } from '@/types/api.types';

export const readJson = async <TData>(data: TData): Promise<ApiEnvelope<TData>> => {
  await new Promise((resolve) => window.setTimeout(resolve, 120));

  return { data };
};
