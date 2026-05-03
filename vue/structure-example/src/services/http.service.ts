import type { ApiEnvelope } from '@/types/api.types';

export async function readJson<TData>(data: TData): Promise<ApiEnvelope<TData>> {
  await new Promise((resolve) => window.setTimeout(resolve, 120));

  return { data };
}
