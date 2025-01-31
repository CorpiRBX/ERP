import { useState, useCallback } from "react";

export const useFetchNames = <T extends Record<string, any>>(
  fetchFunction: (id: number) => Promise<{ data: { name: string } }>
) => {
  const [names, setNames] = useState<{ [key: number]: string }>({});

  const fetchNames = useCallback(async (items: T[], idKey: keyof T & string) => {
    const uniqueIds = new Set(items.map((item) => item[idKey] as number));

    const fetchedNames: { [key: number]: string } = {};
    await Promise.all(
      Array.from(uniqueIds).map(async (id) => {
        try {
          const response = await fetchFunction(id);
          fetchedNames[id] = response.data.name;
        } catch (error) {
          fetchedNames[id] = "Desconocido"; // Manejo de error si el ID no se encuentra
        }
      })
    );

    setNames(fetchedNames);
  }, []);

  return { names, fetchNames };
};
