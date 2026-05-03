export const stringToBoolean = (value?: string | null): boolean => {
  return value?.toLowerCase() === 'true' || value === '1';
};

export const booleanToString = (value?: boolean | null): string => {
  return value === true ? 'true' : 'false';
};
