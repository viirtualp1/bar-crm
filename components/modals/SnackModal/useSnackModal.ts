export default function useSnackModal() {
  const isSnackOpenModal = ref(false)

  function openSnackModal() {
    isSnackOpenModal.value = true
  }

  return {
    isSnackOpenModal,
    openSnackModal,
  }
}
