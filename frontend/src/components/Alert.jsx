import Swal from 'sweetalert2'

export const show_alerta = (msj, icon, color) => {
    Swal.fire({
        width: 250,
        html: '<div class="alert_container">' + icon + '<span class="' + color + '">' + msj + '</span></div>',
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


export const confirmation = async (name, url, redir) => {
    const alert = Swal.mixin({ buttonsStyling: true });
    alert.fire({
        title: 'Are You sure delete ' + name + '?',
        icon: 'question', showCancelButton: true,
        confmButtontext: '<i class="fa-solid fa-check"></i> Yes, delete',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel'
    }).then((result) => {
        if (result.IsConfirmed) {
            sendRequest('DELETE', {}, url, redir);
        }
    });
}

export default show_alerta;