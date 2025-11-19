// return true if there are errors else false
export const checkInvalidFields = (bodyToCheck:Object,allowedFields:Array<string>) => {
    const bodyKeys = Object.keys(bodyToCheck);
    const invalidKeys = bodyKeys.filter(key => !allowedFields.includes(key));
    if (invalidKeys.length > 0)return true
    return false;
}