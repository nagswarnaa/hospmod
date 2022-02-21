
import FlatList from 'flatlist-react';
import React, { useState } from "react"
import { useNavigate } from 'react-router';
// import { useHistory } from "react-router-dom";
import { ROUTES } from '../../js/constants';
import { generateRandom_ID, getOnlyDate } from '../../js/utils';

const DataTable = ({ tableData, headerData, keys, route }) => {

    const navigate = useNavigate()
    let history = useHistory()
    const [selectedPage, setSelectedPage] = useState(1)
    const max = tableData.length / 6
    console.log("route", route)
    const handleRoute = (route, rowData) => {
        history.push({
            pathname: route,
            state: rowData
        })
    }

    return (
        <div className={`table-container center-hv`}>
            <div className={`row-container table-header`} key={generateRandom_ID()}>
                <>
                    <FlatList
                        list={headerData}
                        key={generateRandom_ID()}
                        renderItem={column_name => {
                            return (
                                <div className={`font-lable-m table-cell`} style={{ fontWeight: 500 }}>{column_name}</div>
                            );
                        }}
                    />

                </>
            </div>

            {/* {showFilters? <FilterOptions /> : <div onClick={() => setShowFilters(true)} className={`table-search-lable`}>Filter / Search</div>} */}
            {tableData.length > 0 &&

                <FlatList
                    list={tableData.slice(((selectedPage - 1) * 6), selectedPage * 6)}
                    key={generateRandom_ID()}
                    renderItem={rowData => {

                        return (
                            <div
                                onClick={() => handleRoute(route, rowData)}
                                className={`row-container`}
                                key={generateRandom_ID()}>
                                <TableRow {...{ rowData, keys, route, navigate }} />
                            </div>
                        );
                    }}
                />
            }

            {tableData.length > 6 && (
                <div className={`row j-between margin-t-x`} style={{ width: '65%' }}>
                    <div className={`font-lable-s`}>Pages: {(tableData.length / 6 > 0.00 ? (tableData.length / 6) + 1 : tableData.length / 6).toFixed(0)}</div>
                    <div className={`row center-hv`}>
                        <div className={`font-lable-l main-hover`} onClick={() => selectedPage > 1 && setSelectedPage(selectedPage - 1)}><b>{'<'}</b></div>&nbsp;&nbsp;
                        <div className={`font-lable-m`}>{selectedPage}</div>&nbsp;&nbsp;
                        <div className={`font-lable-l main-hover`} onClick={() => selectedPage < max && setSelectedPage(selectedPage + 1)}><b>{'>'}</b></div>
                    </div>
                </div>
            )}
        </div>

    )
}

const TableRow = ({ rowData, keys, route, navigate }) => {

    return (
        <>
            <FlatList
                list={keys}
                key={generateRandom_ID()}
                renderItem={key => {

                    return (
                        <div
                            style={{ fontWeight: 500 }}
                            className={`font-lable-m table-cell`}
                        >{
                                (rowData[key] && rowData[key].seconds
                                    ? getOnlyDate(rowData[key])
                                    : rowData[key])
                                || 'N/A'
                            }
                        </div>
                    );
                }}
            />
        </>
    )
}
export default DataTable;
