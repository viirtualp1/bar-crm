import Swal, {
  type SweetAlertOptions,
  type SweetAlertUpdatableParameters,
} from 'sweetalert2'

export function toast(
  options: Pick<SweetAlertOptions, SweetAlertUpdatableParameters>,
) {
  return Swal.fire(options)
}
