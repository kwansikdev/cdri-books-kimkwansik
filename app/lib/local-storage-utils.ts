export const setItem = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);
    if (serializedValue) {
      localStorage.setItem(key, serializedValue);
    }
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getItem = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue !== null) {
      return JSON.parse(serializedValue) as T;
    }
    return null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};
