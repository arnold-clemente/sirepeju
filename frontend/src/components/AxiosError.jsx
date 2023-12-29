
import storage from '../Storage/storage'
import { show_alerta } from './MessageAlert'

export const token_expired = () => {
    storage.remove('authToken');
    storage.remove('authUser');
    show_alerta(`401 Sesión Caducada`, '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')

    setTimeout(() => {
        window.location.reload(false);
    }, 2000)
}

export const permission_denied = () => {
    show_alerta(`403 No Autorizado`, '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
    setTimeout(() => {
        window.location.reload(false);
    }, 2000)
}





