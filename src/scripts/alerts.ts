import Swal from 'sweetalert2'

export function fireErrorToast(input: {
    title?: string,
    text?: string
}) {
    Swal.fire({
      toast: true,
      icon: 'error',
      title: input.title,
      text: input.text,
      position: 'bottom-right',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCloseButton: true,
      background: '#ed3737',
      color: '#fff',
    });
}

export function fireSuccessToast(input: {
    title?: string,
    text?: string
}) {
    Swal.fire({
      toast: true,
      icon: 'success',
      title: input.title,
      text: input.text,
      position: 'bottom-right',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCloseButton: true,
      background: '#22c55e',
      color: '#fff',
    });
}