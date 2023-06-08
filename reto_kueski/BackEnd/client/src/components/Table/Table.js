import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Filter from '../Filter/Filter';
import 'styled-components';
import './Table.css';
import Acceso from '../Acceso/Acceso';
import Oponer from '../Oponer/Oponer';
import Rectificar from '../Rectificar/Rectificar';
import Cancelar from '../Cancelar/Cancelar';
// import { faBars } from '@fortawesome/free-regular-svg-icons';


function RequestsTable() {
    const [requests, setRequests] = useState( [] );

    const getData = async (type) => {
        document.getElementById("spinner-overlay").hidden = false;   
        const response = await fetch('/api/requests?type=' + type);
        const data = await response.json();
        setRequests(data);
        document.getElementById("spinner-overlay").hidden = true;
    }

    useEffect(() => {
        getData("all");
    }, []);

    const columns = [
        {
            name: 'Folio',
            selector: row => row.request_id,
            sortable: true,
        },
        {
            name: 'Client ID',
            selector: row => row.client_id,
            sortable: true,
        },
        {
            name: 'ARCO right',
            selector: row => row.request_arco_right,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.request_date.slice(0, 10),
            sortable: true,
        },
        {
            name: "Hour",
            selector: row => row.request_date.slice(11, 19),
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.request_status,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.request_status === "Complete" || row.request_status === "Rejected" ? <p style={{color: "red", fontWeight: "bold", fontSize: "16px"}}>No actions available</p> : 
            row.request_arco_right === 'Access' ? <Acceso request_id={row.request_id}/> : row.request_arco_right === 'Rectify' ? <Rectificar request_id={row.request_id}/> : row.request_arco_right === 'Cancel' ? <Cancelar request_id={row.request_id}/> : <Oponer request_id={row.request_id} />,
        }
    ];

    const [filtered, setFiltered] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredData = requests.filter(
        item =>
            JSON.stringify(item).toUpperCase().indexOf(filtered.toUpperCase()) !== -1
    );

    const subHeader = useMemo(() => {
        const handleClear = () => {
            if (filtered) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFiltered('');
            }
        };

        return (
            <Filter
                onFilter={e => setFiltered(e.target.value)}
                onClear={handleClear}
                filterText={filtered}
            />
        );
    }, [filtered, resetPaginationToggle]);

    const mostrarModalAccess = (request_id) => {
        <Acceso />
    }

    return (
        <div className='main'>
            <div className='fila'>
                <div className='botones-texto'>
                    <h1 className='botones-texto'>Petitions:</h1>
                </div>
                <div className='botones'>
                    <ButtonGroup>
                        <Button variant="light" className='seleccion' onClick={() => getData('all')}>All</Button>
                        <Button variant="light" className='seleccion' onClick={() => getData('Pending')}>Pending</Button>
                        <Button variant="light" className='seleccion' onClick={() => getData("Waiting")}>Waiting</Button>
                        <Button variant="light" className='seleccion' onClick={() => getData('Rejected')}>Rejected</Button>
                        <Button variant="light" className='seleccion' onClick={() => getData('Complete')}>Completed</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className='tabla'>
                <div className="spinner-overlay" id="spinner-overlay" hidden>
                    <div className="spinner">
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </div>
                <DataTable  
                    // title="requests"
                    columns={columns}
                    data={filteredData}
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                    pagination
                    paginationPerPage={25}
                    paginationComponentOptions={{ 
                        noRowsPerPage: true
                    }}
                    subHeader
                    subHeaderComponent={subHeader}
                    // theme="solarized"
                />
            </div>
        </div>
        
    )
}

export default RequestsTable