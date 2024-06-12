
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
                texto: 'Usuario Gobernacion',
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
        texto: 'Solicitud de reserva de nombre',
        permission: 'reservas.panel',
        sublinks: [
            {
                path: '/admin/reservas/solicitudes',
                icon: 'fa-solid fa-file-circle-question',
                texto: 'Registro de solicitud',
                permission: 'reservas.solicitudes',
            },
            {
                path: '/admin/reservas/homonimias',
                icon: 'fa-solid fa-ban',
                texto: 'Solicitudes Observadas',
                permission: 'reservas.homonimias',
            },
            {
                path: '/admin/reservas/reservados',
                icon: 'fa-regular fa-square-check',
                texto: 'Imprimir reserva de nombre',
                permission: 'reservas.reservados',
            },
            {
                path: '/admin/reservas/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'reservas extinguidas',
                permission: 'reservas.caducados',
            },
        ],
    },
    {
        path: '/admin/verificacion',
        icon: 'fa-solid fa-magnifying-glass',
        texto: 'Verificar',
        permission: 'verificacion.entidades',
    },
    {
        icon: 'fa-solid fa-file-shield',
        texto: 'Panel de otorgación',
        permission: 'otorgaciones.panel',
        sublinks: [
            {
                path: '/admin/otorgaciones/procesos',
                icon: 'fa-solid fa-file-shield',
                texto: 'Proceso de otorgación',
                permission: 'otorgaciones',
            },
            {
                path: '/admin/otorgaciones/archivados',
                icon: 'fa-solid fa-box-archive',
                texto: 'Trámites archivados',
                permission: 'otorgaciones.archivados',
            },
            {
                path: '/admin/otorgaciones/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Trámites caducados',
                permission: 'otorgaciones.caducados',
            },
            {
                path: '/admin/otorgaciones/personalidades-juridicas',
                icon: 'fa-solid fa-file-contract',
                texto: 'Personería Jurídica',
                permission: 'otorgaciones.personalidades',
            },
            {
                path: '/admin/otorgaciones/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Trámites en modificación',
                permission: 'otorgaciones.modificaciones',
            },
            {
                path: '/admin/otorgaciones/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Personería revocada',
                permission: 'otorgaciones.revocatorias',
            },
            {
                path: '/admin/otorgaciones/extinguidas',
                icon: 'fa-solid fa-circle-check',
                texto: 'Personería extinguida',
                permission: 'otorgaciones.extinguidas',
            },
        ],
    },
    {
        icon: 'fa-solid fa-rectangle-ad',
        texto: 'Panel de adecuación',
        permission: 'adecuaciones.panel',
        sublinks: [
            {
                path: '/admin/adecuaciones/procesos',
                icon: 'fa-solid fa-plus',
                texto: 'Proceso de adecuación',
                permission: 'adecuaciones',
            },
            {
                path: '/admin/adecuaciones/archivados',
                icon: 'fa-solid fa-box-archive',
                texto: 'Trámites archivados',
                permission: 'adecuaciones.archivados',
            },
            {
                path: '/admin/adecuaciones/caducados',
                icon: 'fa-solid fa-hourglass',
                texto: 'Trámites caducados',
                permission: 'adecuaciones.caducados',
            },
            {
                path: '/admin/adecuaciones/personalidades',
                icon: 'fa-solid fa-file-contract',
                texto: 'Personería Jurídica',
                permission: 'adecuaciones.personalidades',
            },
            {
                path: '/admin/adecuaciones/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Trámites en modificación',
                permission: 'adecuaciones.modificaciones',
            },
            {
                path: '/admin/adecuaciones/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Personería revocada',
                permission: 'adecuaciones.revocatorias',
            },
            {
                path: '/admin/adecuaciones/extinguidas',
                icon: 'fa-solid fa-circle-check',
                texto: 'Personería extinguida',
                permission: 'adecuaciones.extinguidas',
            },
        ],
    },
    {
        path: '/admin/modificaciones',
        icon: 'fa-solid fa-pen-to-square',
        texto: 'Registro de modificaciones realizadas',
        permission: 'modificaciones',
    },
    {
        path: '/admin/otorgaciones-gobernaciones',
        icon: 'fa-solid fa-file-arrow-up',
        texto: 'Personerias otorgadas por los G.A.D. a nivel nacional',
        permission: 'otorgacion.gobernaciones',
    },
   
    {
        path: '/admin/registrados',
        icon: 'fa-regular fa-bookmark',
        texto: 'Registro de adecuaciones a la ley 351 - Verificacion y Compatibilidad - Decreto supremo 3746',
        permission: 'registrados',
    },

];