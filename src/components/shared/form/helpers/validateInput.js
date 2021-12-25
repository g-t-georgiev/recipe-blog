const checks = {
    minLength: function (value, charCount) {
        return value.length >= charCount;
    },
    maxLength: function (value, charCount) {
        return value.length <= charCount;
    },
    match: function (value, regex) {
        return regex.test(value);
    }
};

export default function validator(fieldName, fieldValue, schema) {
    let result = '';

    for (const check in schema[fieldName]) {
        const { value, message } = schema[fieldName][check];
        const isValid = checks[check](fieldValue, value);

        if (!isValid) {
            result = message;
            break;
        }
    }

    return result;
}