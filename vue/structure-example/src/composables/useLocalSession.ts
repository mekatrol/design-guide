import { stringToBoolean } from '@/utils/conversion';

export interface LocalSessionValue<TValue> {
  setting: TValue | null;
  remove: () => void;
}

abstract class BaseLocalSessionValue<TValue> implements LocalSessionValue<TValue> {
  protected readonly key: string;

  public constructor(key: string) {
    this.key = key;
  }

  public get setting(): TValue | null {
    const value = window.localStorage.getItem(this.key);

    if (value === null) {
      return null;
    }

    return this.getValue(value);
  }

  public set setting(value: TValue | null) {
    if (value === null) {
      this.remove();
      return;
    }

    this.setValue(value);
  }

  public remove = (): void => {
    window.localStorage.removeItem(this.key);
  };

  protected abstract getValue(value: string): TValue | null;
  protected abstract setValue(value: TValue): void;
}

class BooleanLocalSessionValue extends BaseLocalSessionValue<boolean> {
  protected getValue(value: string): boolean | null {
    const normalizedValue = value.toLowerCase();

    if (
      normalizedValue !== 'true' &&
      normalizedValue !== 'false' &&
      normalizedValue !== '1' &&
      normalizedValue !== '0'
    ) {
      return null;
    }

    return stringToBoolean(normalizedValue);
  }

  protected setValue(value: boolean): void {
    window.localStorage.setItem(this.key, value ? 'true' : 'false');
  }
}

class IntegerLocalSessionValue extends BaseLocalSessionValue<number> {
  protected getValue(value: string): number | null {
    const intValue = Number.parseInt(value, 10);

    if (Number.isNaN(intValue)) {
      return null;
    }

    return intValue;
  }

  protected setValue(value: number): void {
    window.localStorage.setItem(this.key, value.toString());
  }
}

class StringLocalSessionValue extends BaseLocalSessionValue<string> {
  protected getValue(value: string): string | null {
    return value;
  }

  protected setValue(value: string): void {
    window.localStorage.setItem(this.key, value);
  }
}

class JsonObjectLocalSessionValue<TValue> extends BaseLocalSessionValue<TValue> {
  protected getValue(value: string): TValue | null {
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as TValue;
    } catch {
      return null;
    }
  }

  protected setValue(value: TValue): void {
    window.localStorage.setItem(this.key, JSON.stringify(value));
  }
}

export const useLocalSessionJsonObject = <TValue>(key: string): LocalSessionValue<TValue> => {
  return new JsonObjectLocalSessionValue<TValue>(key);
};

export const useLocalSessionString = (key: string): LocalSessionValue<string> => {
  return new StringLocalSessionValue(key);
};

export const useLocalSessionBoolean = (key: string): LocalSessionValue<boolean> => {
  return new BooleanLocalSessionValue(key);
};

export const useLocalSessionInteger = (key: string): LocalSessionValue<number> => {
  return new IntegerLocalSessionValue(key);
};
