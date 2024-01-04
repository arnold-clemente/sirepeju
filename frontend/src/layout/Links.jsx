
export const links = [
    {
        path: '/admin',
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
                path: '/admin/administrativos',
                icon: 'fa-regular fa-user',
                texto: 'Administrativos',
                permission: 'administrativos',
            },
            {
                path: '/admin/gobernaciones',
                icon: 'fa-solid fa-laptop-file',
                texto: 'Gobernacion',
                permission: 'gobernacions',
            },
            {
                path: '/admin/roles',
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
                path: '/admin/reservas',
                icon: 'fa-solid fa-file-circle-question',
                texto: 'Solicitud de Reserva',
                permission: 'reservas.solicitudes',
            },
            {
                path: '/admin/reserva/homonimias',
                icon: 'fa-solid fa-ban',
                texto: 'Reserva Homonimia',
                permission: 'reservas.homonimias',
            },
            {
                path: '/admin/reserva/reservados',
                icon: 'fa-regular fa-square-check',
                texto: 'Reservados',
                permission: 'reservas.reservados',
            },
            {
                path: '/admin/reserva/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Caducados Pame',
                permission: 'reservas.caducados',
            },
        ],
    },
    {
        path: '/admin/verificar/reserva',
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
                path: '/admin/otorgaciones',
                icon: 'fa-solid fa-file-shield',
                texto: 'Proceso Otorgación',
                permission: 'otorgaciones',
            },
            {
                path: '/admin/otorgacion/archivados',
                icon: 'fa-solid fa-box-archive',
                texto: 'Otorgación Archivados',
                permission: 'otorgaciones.archivados',
            },
            {
                path: '/admin/otorgacion/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Otorgación Caducados',
                permission: 'otorgaciones.caducados',
            },
            {
                path: '/admin/otorgacion/personalidades-juridicas',
                icon: 'fa-solid fa-file-contract',
                texto: 'Personalidades Jurídicas',
                permission: 'otorgaciones.personalidades',
            },
            {
                path: '/admin/otorgacion/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Otorgación Modificación',
                permission: 'otorgaciones.modificaciones',
            },
            {
                path: '/admin/otorgacion/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Otorgación Revocados',
                permission: 'otorgaciones.revocatorias',
            },
            {
                path: '/admin/otorgacion/extinguidas',
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
                path: '/admin/adecuaciones',
                icon: 'fa-solid fa-plus',
                texto: 'Crear Adecuación',
                permission: 'adecuaciones',
            },
            {
                path: '/admin/adecuacion/archivados',
                icon: 'fa-solid fa-box-archive',
                texto: 'Adecuación Archivados',
                permission: 'adecuaciones.archivados',
            },
            {
                path: '/admin/adecuacion/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Adecuación Caducados',
                permission: 'adecuaciones.caducados',
            },
            {
                path: '/admin/adecuacion/personalidades',
                icon: 'fa-solid fa-file-contract',
                texto: 'Adecuación Personalidades',
                permission: 'adecuaciones.personalidades',
            },
            {
                path: '/admin/adecuacion/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Adecuación Modificación',
                permission: 'adecuaciones.modificaciones',
            },
            {
                path: '/admin/adecuacion/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Adecuación Revocados',
                permission: 'adecuaciones.revocatorias',
            },
            {
                path: '/admin/adecuacion/extinguidas',
                icon: 'fa-solid fa-circle-check',
                texto: 'Adecuación Extinguidas',
                permission: 'adecuaciones.extinguidas',
            },
        ],
    },
    {
        path: '/admin/otorgaciones-gobernaciones',
        icon: 'fa-solid fa-file-arrow-up',
        texto: 'Otorgación Gobernación',
        permission: 'otorgacion.gobernaciones',
    },
    {
        path: '/admin/modificaciones',
        icon: 'fa-solid fa-pen-to-square',
        texto: 'Modificación',
        permission: 'modificaciones',
    },
    {
        path: '/admin/registrados',
        icon: 'fa-regular fa-bookmark',
        texto: 'Registrados Adecuación',
        permission: 'registrados',
    },

];