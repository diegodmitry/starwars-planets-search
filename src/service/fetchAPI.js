const URL = ' https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanetAPI = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    // console.log(data);
    return data;
}

export default fetchPlanetAPI;
