
export const links = [
    {
        path: '/admin/dashboard',
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
                path: '/admin/usuario-gobernaciones',
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
                path: '/admin/reservas/solicitudes',
                icon: 'fa-solid fa-file-circle-question',
                texto: 'Solicitud de Reserva',
                permission: 'reservas.solicitudes',
            },
            {
                path: '/admin/reservas/homonimias',
                icon: 'fa-solid fa-ban',
                texto: 'Reserva Homonimia',
                permission: 'reservas.homonimias',
            },
            {
                path: '/admin/reservas/reservados',
                icon: 'fa-regular fa-square-check',
                texto: 'Reservados',
                permission: 'reservas.reservados',
            },
            {
                path: '/admin/reservas/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Caducados',
                permission: 'reservas.caducados',
            },
        ],
    },
    {
        path: '/admin/verificacion',
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
                path: '/admin/otorgaciones/procesos',
                icon: 'fa-solid fa-file-shield',
                texto: 'Proceso Otorgación',
                permission: 'otorgaciones',
            },
            {
                path: '/admin/otorgaciones/archivados',
                icon: 'fa-solid fa-box-archive',
                texto: 'Otorgación Archivados',
                permission: 'otorgaciones.archivados',
            },
            {
                path: '/admin/otorgaciones/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Otorgación Caducados',
                permission: 'otorgaciones.caducados',
            },
            {
                path: '/admin/otorgaciones/personalidades-juridicas',
                icon: 'fa-solid fa-file-contract',
                texto: 'Personalidades Jurídicas',
                permission: 'otorgaciones.personalidades',
            },
            {
                path: '/admin/otorgaciones/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Otorgación Modificación',
                permission: 'otorgaciones.modificaciones',
            },
            {
                path: '/admin/otorgaciones/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Otorgación Revocados',
                permission: 'otorgaciones.revocatorias',
            },
            {
                path: '/admin/otorgaciones/extinguidas',
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
                path: '/admin/adecuaciones/procesos',
                icon: 'fa-solid fa-plus',
                texto: 'Crear Adecuación',
                permission: 'adecuaciones',
            },
            {
                path: '/admin/adecuaciones/archivados',
                icon: 'fa-solid fa-box-archive',
                texto: 'Adecuación Archivados',
                permission: 'adecuaciones.archivados',
            },
            {
                path: '/admin/adecuaciones/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Adecuación Caducados',
                permission: 'adecuaciones.caducados',
            },
            {
                path: '/admin/adecuaciones/personalidades',
                icon: 'fa-solid fa-file-contract',
                texto: 'Adecuación Personalidades',
                permission: 'adecuaciones.personalidades',
            },
            {
                path: '/admin/adecuaciones/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Adecuación Modificación',
                permission: 'adecuaciones.modificaciones',
            },
            {
                path: '/admin/adecuaciones/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Adecuación Revocados',
                permission: 'adecuaciones.revocatorias',
            },
            {
                path: '/admin/adecuaciones/extinguidas',
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