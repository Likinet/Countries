function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = 'You must fill this field above'
    } else if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.name)){
        errors.name='Can only enter letters'
    } else
        errors.name = '';

    if (input.duration < 0)
        errors.duration = 'Duration must be greater than zero'
    else
        errors.duration = '';

    if (!input.difficulty) {
        errors.difficulty = 'You must choose the difficulty'
    } else
        errors.difficulty = '';

    if (!['winter', 'summer', 'autumn', 'spring'].includes(input.season)) {
        errors.season = 'You must choose the season'
    }
    else
        errors.season = '';

    if (!input.countries.length ) {
        errors.countries = 'You must select at least one country'
    }
    else
        errors.countries = '';
        
    return errors;
}

export default validate;