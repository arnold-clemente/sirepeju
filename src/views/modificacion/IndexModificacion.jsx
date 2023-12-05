import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { estilos } from '../../components/estilosdatatables';

import { getModificaciones } from '../../api/modificacionApi';
// modal 
import { useModal } from '../../hooks/useModal'
// modal components 
import ModalShowMod from './ModalShowMod';


const IndexModificacion = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // para el modal show Otorgacion
    const [modalOtorgacion, openOtorgacion, closeOtorgacion] = useModal(false);
    const [otorgacionShow, setotorgacionShow] = useState({
        id: 0,
        codigo_modificacion: 'APN - 000',
        tipo: 'undefine',
        personalidad_juridica: 'undefine',
        miembros_fundador: 'undefine',
        domicilio_legal: 'undefine',
        seguimiento: 'undefine',
        cite_informe_preliminar: 'undefine',
        otorgacion_id: 0,
        adecuacion_id: 0,
    });


    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['modificaciones'],
        queryFn: getModificaciones,
        select: modificaciones => modificaciones.sort((a, b) => b.id - a.id)
    })

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            if (
                registro.miembros_fundador.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.personalidad_juridica.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.representante.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.codigo_modificacion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.ci_rep.toLowerCase().includes(search.toLowerCase())
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
        e.preventDefault();
        openOtorgacion();
        const auxiliar = {
            id: row.id,
            estatuto_organico: row.estatuto_organico,
            reglamento_interno: row.reglamento_interno,
            codigo_modificacion: row.codigo_modificacion,
            tipo: row.tipo,
            personalidad_juridica: row.personalidad_juridica,
            miembros_fundador: row.miembros_fundador,
            domicilio_legal: row.domicilio_legal,
            seguimiento: row.seguimiento,
            cite_informe_preliminar: row.cite_informe_preliminar,
            otorgacion_id: row.otorgacion_id,
            adecuacion_id: row.adecuacion_id,
        }
        setotorgacionShow({ ...otorgacionShow, ...auxiliar })
    }

    const handleImprimir = (e, row) => {
        e.preventDefault();
        const prueba = row;
        setotorgacionShow({ ...otorgacionShow, ...prueba })
        console.log(otorgacionShow)
    }


    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='container-fluid d-flex flex-row'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show">
                        <i className="fa-solid fa-eye"></i>
                        <span>Ver</span>
                    </button>
                    <button onClick={(e) => handleImprimir(e, row)} className="button_print">
                        <i className="fa-solid fa-print"></i>
                        <span>Imprimir</span>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Codigo',
            selector: row => row.codigo_modificacion,
            sortable: true,
            grow: 1,
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true,
        },
        {
            name: 'Persona Juridica',
            selector: row => row.personalidad_juridica,
            sortable: true,
            wrap: false,
            grow: 2,
        },
        {
            name: 'Miembros',
            selector: row => row.miembros_fundador,
            sortable: true,
            grow: 2
        },
        {
            name: 'Domicilio',
            selector: row => row.domicilio_legal,
            sortable: true,
        },
        {
            name: 'Seguimiento',
            selector: row => row.seguimiento,
            sortable: true,
        },
        {
            name: 'Informe',
            selector: row => row.cite_informe_preliminar,
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
        <div>
            {loading === true ? <Loading /> : ''}
            <ModalShowMod showRegistro={otorgacionShow} modalRegistro={modalOtorgacion} closeRegistro={closeOtorgacion} />


            <Banner text="MODIFICACIONES" />
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
                    title='TABLA MODIFICACIONES OTORGACION'
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
        </div>
    )
}

export default IndexModificacion
