import {isJsonString} from "./utils";
import {GetOptionsParams} from "./types";

/**
 * Get options from attribute v0.0.1
 * @param {GetOptionsParams} params - The function parameters.
 * @returns {Record<string, any>} - The parsed options.
 */
export function getOptionsFromAttribute({
                                            target,
                                            attributeName = '',
                                            defaultOptions = {},
                                            numericValues = [],
                                            onIsString,
                                            dev = false,
                                        }: GetOptionsParams): Record<string, any> {
    // Validate
    if (!target) {
        if (dev) console.warn('Target not found!', target);
        return defaultOptions;
    }

    // No attribute found
    if (!target.hasAttribute(attributeName)) {
        if (dev) console.warn('Attribute not found from target', attributeName);
        return defaultOptions;
    }

    // Options from attribute
    const dataAttribute = target.getAttribute(attributeName);

    // No value found
    if (!dataAttribute) {
        // Return default options
        return defaultOptions;
    }

    // Not a JSON string
    if (!isJsonString(dataAttribute)) {
        if (typeof onIsString === 'function') {
            // Execute callback if available
            onIsString(dataAttribute);
        } else {
            // Throw warning if callback is not found
            console.warn('Not a JSON string', dataAttribute);
        }
        return defaultOptions;
    }

    // Parse JSON
    let options = JSON.parse(dataAttribute) as Record<string, any>;

    // Loop through each prop
    for (const [key, value] of Object.entries(options)) {
        // Convert boolean string to real boolean
        if (value === "false") options[key] = false;
        else if (value === "true") options[key] = true;

        // Convert string to float
        else if (numericValues.includes(key) && typeof value === 'string' && value.length > 0) options[key] = parseFloat(value);
        else options[key] = value;
    }

    return {...defaultOptions, ...options};
}
