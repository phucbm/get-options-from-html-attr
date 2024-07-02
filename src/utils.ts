/**
 * Is JSON string
 * https://stackoverflow.com/a/32278428/6453822
 * @param string
 * @returns {any|boolean}
 */
export function isJsonString(string: string) {
    try {
        return (JSON.parse(string) && !!string);
    } catch (e) {
        return false;
    }
}