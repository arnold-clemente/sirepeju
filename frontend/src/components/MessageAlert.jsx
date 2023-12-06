import Swal from 'sweetalert2'

export const show_alerta = (msj, icon, color) => {
    Swal.fire({
        width: 250,
        html:  '<div class="alert_container">'+icon+'<span class="'+color+'">'+msj+'</span></div>',
        buttonsStyling: true,
        position: 'top-end',
        background: '#fff',
        color: '#716add',
        backdrop: `rgba(255,255,255,0.1)`,
        showConfirmButton: false,
        timer: 1500,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'swal-wide',
            icon: 'icon-class'
        }
    });
}