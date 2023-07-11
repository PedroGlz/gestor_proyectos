// variable cofiguracion sweetalert2
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',    
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: false,
})
