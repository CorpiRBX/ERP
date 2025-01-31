import { useCallback, useRef } from "react";

/**
 * Hook genérico para manejar la búsqueda de entidades por nombre y actualizar un filtro.
 * @param fetchByNameFunc Función para obtener la entidad por nombre.
 * @param updateFilterFunc Función para actualizar el filtro en el estado.
 * @param filterKey Clave del filtro que se actualizará (ej. "employeeId", "projectId").
 * @param minLength Mínima cantidad de caracteres antes de ejecutar la búsqueda (default: 5).
 */
export const useEntityFilter = <T extends { id: number }, K extends keyof any>(
  fetchByNameFunc: (name: string) => Promise<{ success: boolean; data?: T }>,
  updateFilterFunc: (key: K, value: any) => void,
  filterKey: K,
  minLength: number = 5
) => {
  const debounceTimeout = useRef<number | null>(null);

  const debounce = useCallback((callback: () => void, delay: number) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = window.setTimeout(callback, delay);
  }, []);

  const handleFilter = useCallback(
    (name: string) => {
      debounce(async () => {
        if (name.length >= minLength) {
          try {
            const response = await fetchByNameFunc(name);
            updateFilterFunc(filterKey, response.success && response.data ? response.data.id : undefined);
          } catch {
            updateFilterFunc(filterKey, undefined);
          }
        } else {
          updateFilterFunc(filterKey, undefined);
        }
      }, 1000);
    },
    [fetchByNameFunc, updateFilterFunc, filterKey, minLength, debounce]
  );

  return { handleFilter };
};
