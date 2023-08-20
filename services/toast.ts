import Swal, {
  SweetAlertOptions,
  SweetAlertResult,
  SweetAlertUpdatableParameters,
} from 'sweetalert2'

export function toast(
  options: Pick<SweetAlertOptions, SweetAlertUpdatableParameters>,
) {
  return Swal.fire(options)
}
