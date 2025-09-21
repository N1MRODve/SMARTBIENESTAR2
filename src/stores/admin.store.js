// En la función init del AdminStore, agregar manejo para empresaId undefined
async init(empresaId) {
  if (!empresaId) {
    console.warn('AdminStore: empresaId no proporcionado, no se cargarán datos');
    return; // Salir temprano sin cargar datos
  }
  
  this.empresaId = empresaId;
  console.log('AdminStore: empresaId inicializado con', empresaId);
  
  // Resto de la inicialización
  // ...
}