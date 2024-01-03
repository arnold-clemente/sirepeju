
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
                texto: 'Observados',
                permission: 'reservas.homonimias',
            },
            {
                path: '/reserva/reservados',
                icon: 'fa-regular fa-square-check',
                texto: 'Reserva y Verificación de nombre',
                permission: 'reservas.reservados',
            },
            {
                path: '/reserva/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Dados de Baja',
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
        texto: 'Otorgación',
        permission: 'otorgaciones.panel',
        sublinks: [
            {
                path: '/otorgaciones',
                icon: 'fa-solid fa-file-shield',
                texto: 'Proceso Otorgación',
                permission: 'otorgaciones',
            },
            {
                path: '/otorgacion/archivados',
                icon: 'fa-solid fa-box-archive',
                texto: 'Otorgación Archivados',
                permission: 'otorgaciones.archivados',
            },
            {
                path: '/otorgacion/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Otorgación Caducados',
                permission: 'otorgaciones.caducados',
            },
            {
                path: '/otorgacion/personalidades-juridicas',
                icon: 'fa-solid fa-file-contract',
                texto: 'Personalidades Jurídicas',
                permission: 'otorgaciones.personalidades',
            },
            {
                path: '/otorgacion/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Otorgación Modificación',
                permission: 'otorgaciones.modificaciones',
            },
            {
                path: '/otorgacion/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Otorgación Revocados',
                permission: 'otorgaciones.revocatorias',
            },
            {
                path: '/otorgacion/extinguidas',
                icon: 'fa-solid fa-circle-check',
                texto: 'Otorgación Extinguidas',
                permission: 'otorgaciones.extinguidas',
            },
        ],
    },
    {
        icon: 'fa-solid fa-rectangle-ad',
        texto: 'Adecuación',
        permission: 'adecuaciones.panel',
        sublinks: [
            {
                path: '/adecuaciones',
                icon: 'fa-solid fa-plus',
                texto: 'Crear Adecuación',
                permission: 'adecuaciones',
            },
            {
                path: '/adecuacion/archivados',
                icon: 'fa-solid fa-box-archive',
                texto: 'Adecuación Archivados',
                permission: 'adecuaciones.archivados',
            },
            {
                path: '/adecuacion/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Adecuación Caducados',
                permission: 'adecuaciones.caducados',
            },
            {
                path: '/adecuacion/personalidades',
                icon: 'fa-solid fa-file-contract',
                texto: 'Adecuación Personalidades',
                permission: 'adecuaciones.personalidades',
            },
            {
                path: '/adecuacion/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Adecuación Modificación',
                permission: 'adecuaciones.modificaciones',
            },
            {
                path: '/adecuacion/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Adecuación Revocados',
                permission: 'adecuaciones.revocatorias',
            },
            {
                path: '/adecuacion/extinguidas',
                icon: 'fa-solid fa-circle-check',
                texto: 'Adecuación Extinguidas',
                permission: 'adecuaciones.extinguidas',
            },
        ],
    },
    {
        path: '/otorgaciones-gobernaciones',
        icon: 'fa-solid fa-file-arrow-up',
        texto: 'Otorgación Gobernación',
        permission: 'otorgacion.gobernaciones',
    },
    {
        path: '/modificaciones',
        icon: 'fa-solid fa-pen-to-square',
        texto: 'Modificación',
        permission: 'modificaciones',
    },
    {
        path: '/registrados',
        icon: 'fa-regular fa-bookmark',
        texto: 'Registrados Adecuación',
        permission: 'registrados',
    },

];