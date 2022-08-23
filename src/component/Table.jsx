import React, { useContext } from 'react';
import { GlobalContext } from '../context/Context';
import Filters from './Filters';

// console.log(GlobalContext);

function Table() {
    // Retorna o valor do contexto, ou seja, results
    const { data } = useContext(GlobalContext);
    // Executa o loading enquanto a API é consultada
    if (data.length === 0) return <p>Loading...</p>;

    return (
        <>
            <section>
                <Filters />
            </section>
            <table>
                {/* Colunas da tabela */}
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Rotation Period</th>
                    <th>Orbital Period</th>
                    <th>Diameter</th>
                    <th>Climate</th>
                    <th>Gravity</th>
                    <th>Terrain</th>
                    <th>Surface Water</th>
                    <th>Population</th>
                    <th>Films</th>
                    <th>Created</th>
                    <th>Edited</th>
                    <th>URL</th>
                </tr>
                </thead>

                {/* map para mostrar as informações na tabela */}
                <tbody>
                    {/* Se data.legnth for diferente de 0, execute o map */}
                {data.length !== 0 && data.map((planet) => (
                    <tr key={ planet.name }>
                    <td>{planet.name}</td>
                    <td>{planet.rotation_period}</td>
                    <td>{planet.orbital_period}</td>
                    <td>{planet.diameter}</td>
                    <td>{planet.climate}</td>
                    <td>{planet.gravity}</td>
                    <td>{planet.terrain}</td>
                    <td>{planet.surface_water}</td>
                    <td>{planet.population}</td>
                    <td>
                        {/* Retorna os filmes */}
                        {planet.films.map((film, i) => (
                        <p key={ i }>
                            {film}
                        </p>))}
                    </td>
                    <td>{planet.created}</td>
                    <td>{planet.edited}</td>
                    <td>{planet.url}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

// Será usada no App.js
export default Table;
