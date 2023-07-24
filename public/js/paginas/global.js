// variable cofiguracion sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',    
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: false,
})

/* Alerta que muestra mensaje de cargando */
function alertLodading(msj = 'Cargando información...', icono = "", tiempo = 0){
  let btn_confirmacion = tiempo > 1 ? false : true;

  Swal.fire({
    // title: msj,
    icon: icono,
    timer: tiempo,
    html: msj,//añadir codigo html
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: btn_confirmacion,
  });
};