import Swal from 'sweetalert2'
import storage from '../Storage/storage';

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

export const sendRequest = async (method, params, url, redir = '', token = true) => {
    // if (token) {
    //     const authToken = storage.get('authToken');
    //     window.axios.defaults.headers.common['Authorization'] = 'Bearer ' +authToken
    //     console.log(authToken)
    // }
    let res;
    await axios({ method: method, url: url, data: params }).then(
        response => {
            res = response.data,
                (method != 'GET') ? show_alerta(response.data.message, '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green') : '',
                setTimeout(() =>
                    (redir !== '') ? window.location.href = redir : '', 2000)
        }).catch((errors) => {
            let desc = '';
            res = errors.response.data,
                errors.response.data.errors.map((e) => { desc = desc + ' ' + e })
            show_alerta(desc, '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        })

    return res;
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