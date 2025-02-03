export enum FilterState {
  Valid = "Valid",      // ✅ Se encontró un resultado
  NotFound = "NotFound", // ❌ No se encontraron resultados
  Error = "-1000",      // ⚠️ Error en la consulta (ej. fallo de red)
  Empty = "Empty"       // 🔄 Input vacío o reseteado
}
