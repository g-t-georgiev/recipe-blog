const checks = {
    minLength(value, charCount) {
        return value.length >= charCount;
    },
    maxLength(value, charCount) {
        return value.length <= charCount;
    },
    match(value, regex) {
        return regex.test(value);
    }
};

const checkSchemaConditions = function (fieldName, fieldValue, schema) {
    let result = [];

    for (const check in schema[fieldName]) {
        if (!schema[fieldName].hasOwnProperty(check)) {
            break;
        }

        const condition = schema[fieldName][check];
        const isValid = checks[check](fieldValue, condition.value);

        result.push({
            name: fieldName,
            message: isValid ? null : condition.message,
            valid: isValid
        });
    }

    return result;
}

export default function validator(fieldName, fieldValue, schema, formData = {}, checkOne = true) {
    const errors = [];

    for (fieldName in formData) {
        if (checkOne) {
            checkOne = false;
        }

        fieldValue = formData[fieldName];

        errors.push(...checkSchemaConditions(fieldName, fieldValue, schema));
    }

    if (checkOne) {
        errors.push(...checkSchemaConditions(fieldName, fieldValue, schema));
    }

    return errors;
}