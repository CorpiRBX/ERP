import { useCallback, useRef } from "react";
import { FilterState } from "../types/FilterState";

/**
 * Hook genérico para manejar la búsqueda de entidades por nombre y actualizar un filtro.
 * @param fetchByNameFunc Función para obtener la entidad por nombre.
 * @param updateFilterFunc Función para actualizar el filtro en el estado.
 * @param filterKey Clave del filtro que se actualizará (ej. "employeeId", "projectId").
 * @param minLength Mínima cantidad de caracteres antes de ejecutar la búsqueda.
 */
export const useEntityFilter = <T extends { id: number }, K extends keyof any>(
  fetchByNameFunc: (name: string) => Promise<{ success: boolean; data?: T }>,
  updateFilterFunc: (key: K, value: any, state: FilterState) => void,
  filterKey: K,
  minLength: number
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
            if (response.success && response.data) {
              updateFilterFunc(filterKey, response.data.id, FilterState.Valid);
            } else {
              updateFilterFunc(filterKey, undefined, FilterState.NotFound); // ❌ No encontrado
            }
          } catch {
            updateFilterFunc(filterKey, -1000, FilterState.Error); // ⚠️ Error en la búsqueda
          }
        } else {
          updateFilterFunc(filterKey, undefined, FilterState.Empty); // 🔄 Reinicio del filtro
        }
      }, 1000);
    },
    [fetchByNameFunc, updateFilterFunc, filterKey, minLength, debounce]
  );

  return { handleFilter };
};
