import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
    // Pegar as props passadas no componente dentro de Filters.js
    const { dataTestid, value, name, id, options, handleChange } = props;

    return (
        <select
            data-testid={ dataTestid }
            id={ id }
            name={ name }
            onChange={ handleChange }
            value={ value }
        >
            { options.map((option, i) => (
                <option
                    key={ i }
                    value={ option }
                >
                    {option}
                </option>
            ))}
        </select>
    );
}

// Validando as props
Select.propTypes = {
    dataTestid: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.string,
    handleChange: PropTypes.func,
}.isRequired;

// Exportar para funcao ser usada dentro de Filters.js
export default Select;
