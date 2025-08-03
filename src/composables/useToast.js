export function useToast() {
  return {
    success(msg) {
      alert(msg) // Reemplaza por tu sistema de notificaciones
    },
    error(msg) {
      alert(msg) // Reemplaza por tu sistema de notificaciones
    }
  }
}