
export const links = [
    {
        path: '/',
        icon: 'fa-solid fa-house',
        texto: 'Inicio',
        permission: 'inicio.panel',
    },
    {
        icon: 'fa-regular fa-user',
        texto: 'Usuarios',
        permission: 'usuarios.panel',
        sublinks: [
            {
                path: '/administrativos',
                icon: 'fa-regular fa-user',
                texto: 'Administrativos',
                permission: 'administrativos',
            },
            {
                path: '/gobernaciones',
                icon: 'fa-solid fa-laptop-file',
                texto: 'Gobernacion',
                permission: 'gobernacions',
            },
            {
                path: '/roles',
                icon: 'fa-solid fa-key',
                texto: 'Roles de Usuario',
                permission: 'roles',
            },
        ],
    },
    {
        icon: 'fa-solid fa-file-circle-question',
        texto: 'Reservas Nombre',
        permission: 'reservas.panel',
        sublinks: [
            {
                path: '/reservas',
                icon: 'fa-solid fa-file-circle-question',
                texto: 'Solicitud de Reserva',
                permission: 'reservas.solicitudes',
            },
            {
                path: '/reserva/homonimias',
                icon: 'fa-solid fa-ban',
                texto: 'Reserva Homonimia',
                permission: 'reservas.homonimias',
            },
            {
                path: '/reserva/reservados',
                icon: 'fa-regular fa-square-check',
                texto: 'Reservados',
                permission: 'reservas.reservados',
            },
            {
                path: '/reserva/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Caducados',
                permission: 'reservas.caducados',
            },
        ],
    },
    {
        path: '/verificar/reserva',
        icon: 'fa-solid fa-magnifying-glass',
        texto: 'Verificación de Reserva',
        permission: 'verificacion.entidades',
    },
    {
        icon: 'fa-solid fa-file-shield',
        texto: 'Otorgacion',
        permission: 'otorgaciones.panel',
        sublinks: [
            {
                path: '/otorgaciones',
                icon: 'fa-solid fa-file-shield',
                texto: 'Proceso Otorgacion',
                permission: 'otorgaciones',
            },
            {
                path: '/otorgacion/archivados',
                icon: 'fa-solid fa-box-archive',
                texto: 'Otorgacion Archivados',
                permission: 'otorgaciones.archivados',
            },
            {
                path: '/otorgacion/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Otorgacion Caducados',
                permission: 'otorgaciones.caducados',
            },
            {
                path: '/otorgacion/personalidades-juridicas',
                icon: 'fa-solid fa-file-contract',
                texto: 'Personalidades Juridicas',
                permission: 'otorgaciones.personalidades',
            },
            {
                path: '/otorgacion/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Otorgacion Modificacion',
                permission: 'otorgaciones.modificaciones',
            },
            {
                path: '/otorgacion/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Otorgacion Revocados',
                permission: 'otorgaciones.revocatorias',
            },
            {
                path: '/otorgacion/extinguidas',
                icon: 'fa-solid fa-circle-check',
                texto: 'Otorgacion Extinguidas',
                permission: 'otorgaciones.extinguidas',
            },
        ],
    },
    {
        icon: 'fa-solid fa-rectangle-ad',
        texto: 'Adecuacion',
        permission: 'adecuaciones.panel',
        sublinks: [
            {
                path: '/adecuaciones',
                icon: 'fa-solid fa-plus',
                texto: 'Crear Adecuacion',
                permission: 'adecuaciones',
            },
            {
                path: '/adecuacion/archivados',
                icon: 'fa-solid fa-box-archive',
                texto: 'Adecuacion Archivados',
                permission: 'adecuaciones.archivados',
            },
            {
                path: '/adecuacion/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Adecuacion Caducados',
                permission: 'adecuaciones.caducados',
            },
            {
                path: '/adecuacion/personalidades',
                icon: 'fa-solid fa-file-contract',
                texto: 'Adecuacion Personalidades',
                permission: 'adecuaciones.personalidades',
            },
            {
                path: '/adecuacion/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Adecuacion Modificacion',
                permission: 'adecuaciones.modificaciones',
            },
            {
                path: '/adecuacion/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Adecuacion Revocados',
                permission: 'adecuaciones.revocatorias',
            },
            {
                path: '/adecuacion/extinguidas',
                icon: 'fa-solid fa-circle-check',
                texto: 'Adecuacion Extinguidas',
                permission: 'adecuaciones.extinguidas',
            },
        ],
    },
    {
        path: '/otorgaciones-gobernaciones',
        icon: 'fa-solid fa-file-arrow-up',
        texto: 'Otorgacion Gobernacion',
        permission: 'otorgacion.gobernaciones',
    },
    {
        path: '/modificaciones',
        icon: 'fa-solid fa-pen-to-square',
        texto: 'Modificacion',
        permission: 'modificaciones',
    },
    {
        path: '/registrados',
        icon: 'fa-regular fa-bookmark',
        texto: 'Registrados Adecuacion',
        permission: 'registrados',
    },

];