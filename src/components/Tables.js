import React from 'react'
import './Tables.css'

const Tables = ({data}) => {
    return (
        <div className="tables">
            <div className="s">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th> <h3> Country </h3> </th>
                            <th> <h3> Cases </h3> </th>
                            <th> <h3> Recovered </h3> </th>
                            <th> <h3> Deaths </h3> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {   data.map(country => 
                                <tr>
                                    <td> {country.country} </td>
                                    <td> {country.cases} </td>
                                    <td> {country.recovered} </td>
                                    <td> {country.deaths} </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tables;
