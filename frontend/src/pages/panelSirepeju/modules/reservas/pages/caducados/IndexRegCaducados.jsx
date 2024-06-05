import React, { useCallback, useMemo, useState } from 'react'
import DataTable from "react-data-table-component";

import { useQuery } from 'react-query';
import { getCaducados } from 'api/reservaApi';

import Loading from 'components/Loading';
import Banner from 'components/Banner';
import Spiner from 'components/Spiner';
import { estilos } from 'components/estilosdatatables';
import { useModal } from 'hooks/useModal'

// modal 
import ModalRegCaducados from './ModalRegCaducados';
import RepRegCaducados from './reporte/RepRegCaducados';
import SelectRegistroCaducados from './reporte/SelectRegistroCaducados';

const IndexRegCaducados = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    //para el modal
    const [showregistro, openRegistro, closeRegistro] = useModal(false);
    const [imprimir, openImprimir, closeImprimir] = useModal(false);
    const [selectpdf, openSelectpdf, closeSelectpdf] = useModal(false);
    const [registroShow, setRegistroShow] = useState({});

    const now = new Date().getTime();

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = useMemo(() => {
        const handleDelete = () => {
            openSelectpdf();
        };

        return (
            <button onClick={handleDelete} className='button_select_pdf'>
                <i className="fa-solid fa-print"></i>
                <span>Imprimir</span>
            </button>
        );

    }, [selectedRows, toggleCleared]);


    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['registros_caducados'],
        queryFn: getCaducados,
        select: registros => registros.sort((a, b) => b.id - a.id)
    })

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            if (
                registro.entidad.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.representante.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.nro_certificado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.correo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.persona_colectiva.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
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
        const prueba = row;
        setRegistroShow({ ...registroShow, ...prueba })
        openRegistro();
    }

    const handleImprimir = (e, row) => {
        e.preventDefault();
        const prueba = row;
        setRegistroShow({ ...registroShow, ...prueba })
        openImprimir();
    }

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='d-flex flex-row justify-content-start gap-1'>
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
            width: '120px',
        },
        {
            name: 'hr',
            selector: row => row.id,
            sortable: true,
            wrap: true,
            width: '100px',
        },
        {
            name: 'Nº Correlativo',
            selector: row => row.nro_certificado,
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Naturaleza',
            selector: row => row.naturaleza,
            sortable: true,
            wrap: true,
            width: '250px',
        },
        {
            name: 'Nombre de la Persona Colectiva',
            selector: row => row.entidad,
            sortable: true,
            wrap: true,
            width: '300px',
        },
        {
            name: 'Sigla',
            selector: row => row.sigla,
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Tipo de Personas Colectiva ',
            selector: row => row.persona_colectiva,
            sortable: true,
            wrap: true,
            width: '250px',
        },
        
        {
            name: 'Solicitante',
            selector: row => row.representante,
            sortable: true,
            wrap: true,
            width: '250px',
        },

        {
            name: 'CI',
            selector: row => row.ci_rep + " " + row.ext_ci_rep,
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Nº Celular',
            selector: row => row.telefono,
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Correo Registrado',
            selector: row => row.correo,
            sortable: true,
            wrap: true,
            width: '250px',
        },
    ];

    const paginationOptions = {
        rowsPerPageText: 'Filas por Página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'todos'
    };
    if (isLoading) return <Spiner />
    else if (isError) return <div>Error: {error.message}</div>

    return (

        <div>
            {loading === true ? <Loading /> : ''}
            <Banner text="ENTIDADES CADUCADAS" />
            <ModalRegCaducados registro={registroShow} modal={showregistro} close={closeRegistro} />
            <RepRegCaducados registro={registroShow} modal={imprimir} close={closeImprimir} />
            <SelectRegistroCaducados registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />

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
                    title={'TABLA DE REGISTROS CADUCADOS'}
                    columns={columns}
                    data={filteredRegistros()}
                    paginationComponentOptions={paginationOptions}
                    fixedHeader
                    fixedHeaderScrollHeight='400px'
                    pagination
                    noDataComponent={<span>No se encontro ningun elemento</span>}
                    progressPending={isLoading}
                    customStyles={estilos}
                    highlightOnHover={true}
                    persistTableHead={true}
                    selectableRows
                    contextActions={contextActions}
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={toggleCleared}
                />
            </div>
        </div>
    )
}

export default IndexRegCaducados
