const validationConditionChecker = {
    minLength(checkedValue, conditionValue) {
        return checkedValue >= conditionValue;
    },
    maxLength(checkedValue, conditionValue) {
        return checkedValue <= conditionValue;
    },
    isRequired(checkedValue, conditionValue) {
        return conditionValue && checkedValue.length > 0;
    },
    isEmail(checkedValue, regex) {
        return regex.test(checkedValue);
    },
    default(checkedValue, conditionValue, condition) {
        console.log('Checked value: ' + checkedValue);
        console.log(`Condition: ${condition}, Value: ${conditionValue}`);
        return true;
    }
}

function formInputValidator (checkedValue, validationConditions) {
    const validationResult = { valid: true, reasons: '' };

    if (typeof(validationConditions) !== 'object' && !(validationConditions instanceof Object)) {
        return validationResult;
    }

    for (const condition in validationConditions) {
        const { value: conditionValue, message } = validationConditions[condition];
        const isValid = (validationConditionChecker[condition] ?? validationConditionChecker.default)(checkedValue, conditionValue, condition);
        
        if (!isValid) {
            validationResult.valid = false;
            validationResult.reasons += message + ' ';
        }
    }

    validationResult.reasons = validationResult.reasons.trim();
    return validationResult;
}

export default formInputValidator;