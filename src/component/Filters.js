import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/Context';
import Select from './Select';

// Array será usado para dropdown req3
const optionsComparisonFilter = ['maior que', 'menor que', 'igual a'];

function Filters() {
    const {
        filterByName,
        handleFilterInputByName,
        createNumericValueFilter,
        filterByNumbericValues,
        removeFilter,
        removeAllFilters,
    } = useContext(GlobalContext);

    // Req 3, os dados precisam ser gravados nesse formato
    // O teste do req 3 verifica esses valores como iniciais
    const [filterNumeric, setFilterNumeric] = useState({
        column: 'population',
        comparison: 'maior que',
        value: 0,
    });

    // Criando as opcoes do Select
    // Array será usado para dropdown req3
    const [optionsColumn, setOptionsColumn] = useState(
        ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    );

    // Req6 - Executada no click
    function reCreateOptionsColumn(column) {
        // some testa se um dos elementos passa na condicao
        const verifyOptions = optionsColumn.some((item) => item.includes(column));
        // se diferente de verdadeiro
        if (!verifyOptions) {
            setOptionsColumn((prevState) => [...prevState, column]);
        }
    }
    
    // Req5 - Será execudtado todos as vezes que houver mudanca no filterByNumbericValues
    // Atualizando a lista optionsColumn
    useEffect(() => {
        // Testa todos os elementos do array, removendo o diferente
        // O valor deferente de filter.column é removido e retorna um nov array sem o valor
        const newOptionsColumn = optionsColumn.filter((option) => filterByNumbericValues
            .every((filter) => option !== filter.column));
        // popula o optionsColumn com novo array
        setOptionsColumn(newOptionsColumn);
    }, [filterByNumbericValues]);

    return (
        <section>
            {/* Filtrar pelo nome Req2 */}
            <label htmlFor="filter">
                Filtre os planetas pelo nome:
                <input
                type="text"
                id="filter"
                data-testid="name-filter"
                value={ filterByName }
                onChange={ handleFilterInputByName }
                />
            </label>

            {/* Filtrar coluna Req3e4 */}
            <Select
                dataTestid="column-filter"
                id="column"
                name="column"
                // value é o valor selecinado na coluna
                // preState é o filterNumeric 
                // adiciono a ao column o valor selecionado
                handleChange={
                    ({ target: { value } }) => setFilterNumeric((prevState) => (
                        { ...prevState, column: value }))
                }
                value={ filterNumeric.column }
                options={ optionsColumn }
            />
            <Select
                dataTestid="comparison-filter"
                id="comparison"
                name="comparison"
                handleChange={
                    ({ target: { value } }) => setFilterNumeric((prevState) => (
                        { ...prevState, comparison: value }))
                }
                value={ filterNumeric.comparison }
                options={ optionsComparisonFilter }
            />
            <label htmlFor="value-filter">
                <input
                    type="number"
                    id="value-filter"
                    name="value"
                    data-testid="value-filter"
                    onChange={
                        ({ target: { value } }) => setFilterNumeric((prevState) => (
                        { ...prevState, value }))
                    }
                    value={ filterNumeric.value }
                />
            </label>
            <button
                type="submit"
                data-testid="button-filter"
                onClick={ (e) => {
                    e.preventDefault();
                    createNumericValueFilter(filterNumeric);
                } }
            >
                Filtrar
            </button>

            {/* Req5 - lógica, logo acima*/}
            <div>
                {filterByNumbericValues.length !== 0
                && filterByNumbericValues.map(({ column, comparison, value }, i) => {
                    // adicionado símbolos igual a Req 4
                    let comparisonLabel = '>';
                    if (comparison === 'menor que') comparisonLabel = '<';
                    if (comparison === 'igual a') comparisonLabel = '===';
                    return (
                        <div key={ `${column} + ${i}` } data-testid="filter">
                            <p>
                                {/* Recebe os dados desconstruídos e mostra no HTML */}
                                {column}
                                {/* pular uma linha */}
                                {' '}
                                {comparisonLabel}
                                {' '}
                                {value}
                            </p>
                        {/* Req 6 - Adiciona botao para apagar as linhas individuais*/}
                            <button
                                type="submit"
                                onClick={ (e) => {
                                    e.preventDefault();
                                    // Lógica acima
                                    reCreateOptionsColumn(column);
                                    // Lógica no Context
                                    removeFilter(column);
                                } }
                            >
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
            
            {/* Req 6 - Remove todos os filtros */}
            <div>
                <button
                    type="submit"
                    data-testid="button-remove-filters"
                    onClick={ (e) => {
                        e.preventDefault();
                        removeAllFilters();
                    } }
                >
                    Remover todas filtragens
                </button>
            </div>
        </section>
    );
}

export default Filters;
