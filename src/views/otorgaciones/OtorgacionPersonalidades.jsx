import React, { useState } from 'react'
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { estilos } from '../../components/estilosdatatables';
import storage from '../../Storage/storage'

import { getPersonalidades } from '../../api/otorgacionesApi';
// modal 
import { useModal } from '../../hooks/useModal'
import ModalShowOtorgacion from './ModalShowOtorgacion';
import ModalRevocarOtorgacion from './ModalRevocarOtorgacion';
import ModalModificacion from './ModalModificacion';

const OtorgacionPersonalidades = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // para el modal show Otorgacion
    const [modalOtorgacion, openOtorgacion, closeOtorgacion] = useModal(false);
    const [modificacion, openModificacion, closeModificacion] = useModal(false);
    const [otorgacionShow, setotorgacionShow] = useState({});

    //para el revocatoria
    const [revocatoriaModal, openRevocatoriaModal, closeRevocatoriaModal] = useModal(false);
    const [revocatoria, setRevocatoria] = useState({ otorgacion_id: 1, nota_revocatorio: '', fecha_revocatoria: '', observacion: '' });
    const [update, setUpdate] = useState({
        fecha: '',
        otorgacion_id: 0,
        codigo_modificacion: '',
        personalidad_juridica: '',
        estatuto_organico: '',
        reglamento_interno: '',
        domicilio_legal: '',
        miembros_fundador: '',
        seguimiento: '',
        cite_informe_preliminar: '',
        user_id: storage.get('authUser').id,
    });

    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['personalidadesotorgacion'],
        queryFn: getPersonalidades,
        select: otorgaciones => otorgaciones.sort((a, b) => b.id - a.id)
    })

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            if (
                registro.miembros_fundador.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.personalidad_juridica.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.codigo_otorgacion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())
            ) {
                return registro;
            }
        });

        return filtered
    }

    const searchOnChange = async (e, row) => {
        e.persist();
        await setSearch(e.target.value);
    };

    const handleShow = (e, row) => {
        console.log(row)
        e.preventDefault();
        openOtorgacion();
        const prueba = row;
        setotorgacionShow({ ...otorgacionShow, ...prueba })

    }

    const handleInputRevocatoria = ({ target }) => {
        setRevocatoria({
            ...revocatoria,
            [target.name]: target.value
        });
    };

    const handleRevocar = (e, row) => {
        e.preventDefault();
        const auxiliar = {
            otorgacion_id: row.id,
            nota_revocatorio: '',
            fecha_revocatoria: '',
            observacion: ''
        }
        setRevocatoria({ ...revocatoria, ...auxiliar })
        openRevocatoriaModal();
    }

    const handleModificar = (e, row) => {
        e.preventDefault();
        const auxiliar = {
            fecha: '',
            otorgacion_id: row.id,
            codigo_modificacion: row.codigo_otorgacion,
            personalidad_juridica: row.personalidad_juridica,
            estatuto_organico: row.estatuto_organico,
            reglamento_interno: row.reglamento_interno,
            domicilio_legal: row.domicilio_legal,
            miembros_fundador: row.miembros_fundador,
            seguimiento: row.seguimiento,
            cite_informe_preliminar: row.cite_informe_preliminar,
        }
        setUpdate({ ...update, ...auxiliar });
        openModificacion();
    }


    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='container-fluid d-flex flex-row'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
                    <button onClick={(e) => handleModificar(e, row)} className="button_edit"><i className="fa-solid fa-pen-to-square"></i><span>Modificar</span></button>
                    <button onClick={(e) => handleRevocar(e, row)} className="button_delete"><i className="fa-regular fa-circle-xmark"></i><span>Revocar</span></button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            grow: 1,
        },
        {
            name: 'Persona Juridica',
            selector: row => row.personalidad_juridica,
            sortable: true,
            grow: 3,
        },
        {
            name: 'Miembros',
            selector: row => row.miembros_fundador,
            sortable: true,
            grow: 2
        },
        {
            name: 'Sigla',
            selector: row => row.sigla,
            sortable: true,
        },
        {
            name: 'Codigo',
            selector: row => row.codigo_otorgacion,
            sortable: true,
        },
        {
            name: 'Naturaleza',
            selector: row => row.naturaleza,
            sortable: true,
        },
    ];

    const paginationOptions = {
        rowsPerPageText: 'Filas por Página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'todos'
    };
    if (isLoading) return <Loading />
    else if (isError) return <div>Error: {error.message}</div>
    return (
        <>
            {loading === true ? <Loading /> : ''}

            {/* par el modal de revocatoria  */}
            <ModalRevocarOtorgacion registrorModal={revocatoriaModal} closeRegistrorModal={closeRevocatoriaModal} openRegistrorModal={openRevocatoriaModal}
                registro={revocatoria} handleInputChange={handleInputRevocatoria} />

            {/* para le modal show otorgacion  */}
            <ModalShowOtorgacion showRegistro={otorgacionShow} modalRegistro={modalOtorgacion} closeRegistro={closeOtorgacion} />
            {/* modal modoificacion  */}
            <ModalModificacion registro={update} modal={modificacion} open={openModificacion} close={closeModificacion} />
            <Banner text="PERSONALIDAD JURIDICA OTORGACION" />
            <div className='container-fluid d-flex flex-row md:flex-columns my-4'>
                <div className='input_search'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="search"
                        className='form-control'
                        placeholder='Buscar entidad'
                        name='search'
                        value={search}
                        onChange={searchOnChange}
                    />
                </div>
            </div>
            <div className='table-responsive'>
                <DataTable
                    title={'TABLA DE OTORGACIONES'}
                    columns={columns}
                    data={filteredRegistros()}
                    paginationComponentOptions={paginationOptions}
                    fixedHeader
                    fixedHeaderScrollHeight='800px'
                    pagination
                    noDataComponent={<span>No se encontro ningun elemento</span>}
                    progressPending={isLoading}
                    customStyles={estilos}
                    highlightOnHover={true}
                    persistTableHead={true}
                />
            </div>
        </>
    )
}

export default OtorgacionPersonalidades
