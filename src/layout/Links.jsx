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
            {
                path: '/user-roles',
                icon: 'fa-solid fa-key',
                texto: 'Roles de Usuario'
            },
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
        path: '/otorgaciones',
        icon: 'fa-solid fa-file-shield',
        texto: 'Otogaciones'
    },
    {
        path: '/personalidades-juridicas',
        icon: 'fa-solid fa-file-contract',
        texto: 'Personalidades Juridicas'
    },

];