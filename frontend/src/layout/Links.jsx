
export const links = [
    {
        path: '/',
        icon: 'fa-solid fa-house',
        texto: 'Inicio'
    },
    {
        icon: 'fa-regular fa-user',
        texto: 'Usuarios',
        sublinks: [
            {
                path: '/administrativos',
                icon: 'fa-regular fa-user',
                texto: 'Administrativos'
            },
            {
                path: '/user-gobernaciones',
                icon: 'fa-solid fa-laptop-file',
                texto: 'Gobernacion'
            },
            // {
            //     path: '/user-roles',
            //     icon: 'fa-solid fa-key',
            //     texto: 'Roles de Usuario'
            // },
        ],
    },
    {
        icon: 'fa-solid fa-file-circle-question',
        texto: 'Reservas Nombre',
        sublinks: [
            {
                path: '/reservas',
                icon: 'fa-solid fa-file-circle-question',
                texto: 'Solicitud de Reserva'
            },
            {
                path: '/reserva-homonimia',
                icon: 'fa-solid fa-ban',
                texto: 'Reserva Homonimia'
            },
            {
                path: '/registro-reserva',
                icon: 'fa-regular fa-square-check',
                texto: 'Reservados'
            },
        ],
    },
    {
        path: '/buscar/reserva',
        icon: 'fa-solid fa-magnifying-glass',
        texto: 'Verificación de Reserva'
    },
    {
        icon: 'fa-solid fa-file-shield',
        texto: 'Otorgacion',
        sublinks: [
            {
                path: '/otorgaciones',
                icon: 'fa-solid fa-file-shield',
                texto: 'Proceso Otorgacion'
            },
            {
                path: '/otorgacion/personalidades-juridicas',
                icon: 'fa-solid fa-file-contract',
                texto: 'Personalidades Juridicas'
            },
            {
                path: '/otorgacion/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Otorgacion Modificacion'
            },
            {
                path: '/otorgacion/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Otorgacion Revocados'
            },
        ],
    },
    {
        icon: 'fa-solid fa-rectangle-ad',
        texto: 'Adecuacion',
        sublinks: [
            {
                path: '/adecuaciones',
                icon: 'fa-solid fa-plus',
                texto: 'Crear Adecuacion'
            },
            {
                path: '/adecuacion/personalidades',
                icon: 'fa-solid fa-file-contract',
                texto: 'Adecuacion Personalidades'
            },
            {
                path: '/adecuacion/modificaciones',
                icon: 'fa-solid fa-pen-to-square',
                texto: 'Adecuacion Modificacion'
            },
            {
                path: '/adecuacion/revocados',
                icon: 'fa-solid fa-ban',
                texto: 'Adecuacion Revocados'
            },
        ],
    },
    {
        path: '/otorgaciones-gobernaciones',
        icon: 'fa-solid fa-file-arrow-up',
        texto: 'Otorgacion Gobernacion'
    },
    {
        path: '/modificaciones',
        icon: 'fa-solid fa-pen-to-square',
        texto: 'Modificacion'
    },
];