import React, {createContext, useCallback, useEffect, useState} from "react";
// Necessario por causa das props
import PropTypes from 'prop-types'; 
import fetchPlanetAPI from "../service/fetchAPI";

// Dentro do GlobalContext terá o Consumer e Provider
export const GlobalContext = createContext();

function PlanetsProvider({children}) {
    // orinalData e data serão populados com os dados do fetch
    const [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState([]);

    // filterByName será populado Req2
    const [filterByName, setFilterByName] = useState('');

    // Req 3 - array com esse nome filterByNumericValues
    // filterByNumbericValues será populado com informacoes do campo population, comparison e do input
    const [filterByNumbericValues, setFilterByNumericValues] = useState([]);
    // console.log(filterByNumbericValues);

    //Solicitando API Req 1
    async function fetchPlanets() {
        const planets = await fetchPlanetAPI();
        // Observei na imagem do req 1 não tem a coluna residents
        // Removi a coluna residents
        const results = planets.results.filter((item) => delete item.residents);
        // Populando o data e o orinalData com results
        setData(results);
        setOriginalData(results);
    }

    // função fará a lógica de filtrar por nomes Req2
    function createFilterByName(value) {
        // verficia se o input está vazio
        if (value.length !== 0) {
            // um array que tem um obj ou objs de acordo como valor incluso no campo input
            const dataFilterName = data
                .filter((planet) => planet.name.toLowerCase().includes(value));
            
            // popule data de acordo com que é digitado
            setData(dataFilterName);
        } else {
            // popule data com os dados originais
            setData(originalData);
        }
    }

    // Req 3 - 3
    // De acordo com a documentacao funciona melhor do que shouldComponentUpdate
    // useCallback usado para previnir renderizações desnecessárias para atualizacao da interface e.g: useEffect()
    // funcao retornada será execdutada dentro do useEffect
    const createMultipleNumericFilters = useCallback(() => {
        // criei uma nova variável
        let newData = originalData;
        // Desestruturacao
        filterByNumbericValues.forEach(({ comparison, column, value }) => {
            // newData receberá um novo array de acordo com as condicoes estabelecidas
            newData = newData.filter((planet) => {
                // Se selecionado o 'maior que' retorna true ou false
                // de acordo com a population(planet[column]) com o valor maior do que input
                if (comparison === 'maior que') return Number(planet[column]) > Number(value);
                if (comparison === 'menor que') return Number(planet[column]) < Number(value);
                // retrona true ou false se 'igual a' for selecionado
                // Último requisito do Req3
                return Number(planet[column]) === Number(value);
            });
        });
        // popule data com newData
        setData(newData);
        // condicao para a funcao ser executada
    }, [originalData, setData, filterByNumbericValues]);

    // Req 6 - Ao clicar no x a coluna recebida por parâmetro será removida
    // Faz comparacao do estado anterior(filterByNumbericValues) com o resultado recebido por parametro
    // Retorna um novo array, 
    function removeFilter(column) {
        setFilterByNumericValues((prevState) => prevState.filter((item) => item
          .column !== column));
    }

    // Req3 - 1 
    // Funcao utilizada no botao Filtrar
    // filter é um obj que recebe as chaves column, comparison e value
    function createNumericValueFilter(filter) {
        // Adicione dados no filterByNumbericValues
        setFilterByNumericValues((prevState) => [...prevState, filter]);
    }

    //Req 2
    function handleFilterInputByName({ target }) {
        // preciso habilitar o campo input atribuindo o valor para filterByName
        setFilterByName(target.value);
        // funcao filtra os valores digitados no campo input
        createFilterByName(target.value);
    }

    //Req6 - Remover todos os filtros
    function removeAllFilters() {
        // filterByNumbericValues recebe um array empty
        setFilterByNumericValues([]);
        // data recebe os dados originais
        setData(originalData);
    }

    // Req3 - 2
    useEffect(() => {
        if (filterByNumbericValues.length !== 0) {
          createMultipleNumericFilters();
        } else {
          setData(originalData);
        }
        // condicao para esse useEffect ser executado
    }, [filterByNumbericValues]);

    // Req1
    // componentDidMount
    useEffect(() => {
        fetchPlanets();
    }, []);

    // Compartilhando os dados dentro do contextValue
    const contextValue = {
        data,
        filterByName,
        handleFilterInputByName,
        createNumericValueFilter,
        filterByNumbericValues,
        removeFilter,
        removeAllFilters,
    };
    // Todos os filhos irão receber os valores de contextValue
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
}

// Verificar o tipo de props
PlanetsProvider.propTypes = {
    children: PropTypes.string,
}.isRequired

export default PlanetsProvider;
