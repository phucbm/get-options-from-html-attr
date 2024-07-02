import {GetOptionsParams} from '../src/types';
import {isJsonString} from '../src/utils';
import {getOptionsFromAttribute} from "../src";

jest.mock('../src/utils', () => ({
    isJsonString: jest.fn(),
}));

describe('getOptionsFromAttribute', () => {
    let mockTarget: HTMLElement;

    beforeEach(() => {
        mockTarget = document.createElement('div');
    });

    it('should return default options if target is not found', () => {
        const params: GetOptionsParams = {
            target: null,
            attributeName: 'data-options',
            defaultOptions: {key: 'value'},
            dev: true,
        };

        const result = getOptionsFromAttribute(params);
        expect(result).toEqual({key: 'value'});
    });

    it('should return default options if attribute is not found', () => {
        const params: GetOptionsParams = {
            target: mockTarget,
            attributeName: 'data-options',
            defaultOptions: {key: 'value'},
            dev: true,
        };

        const result = getOptionsFromAttribute(params);
        expect(result).toEqual({key: 'value'});
    });

    it('should return default options if attribute value is empty', () => {
        mockTarget.setAttribute('data-options', '');

        const params: GetOptionsParams = {
            target: mockTarget,
            attributeName: 'data-options',
            defaultOptions: {key: 'value'},
        };

        const result = getOptionsFromAttribute(params);
        expect(result).toEqual({key: 'value'});
    });

    it('should return default options if attribute value is not a JSON string', () => {
        (isJsonString as jest.Mock).mockReturnValue(false);
        mockTarget.setAttribute('data-options', 'not a json string');

        const params: GetOptionsParams = {
            target: mockTarget,
            attributeName: 'data-options',
            defaultOptions: {key: 'value'},
        };

        const result = getOptionsFromAttribute(params);
        expect(result).toEqual({key: 'value'});
    });

    it('should call onIsString callback if attribute value is not a JSON string', () => {
        (isJsonString as jest.Mock).mockReturnValue(false);
        mockTarget.setAttribute('data-options', 'not a json string');
        const onIsStringMock = jest.fn();

        const params: GetOptionsParams = {
            target: mockTarget,
            attributeName: 'data-options',
            defaultOptions: {key: 'value'},
            onIsString: onIsStringMock,
        };

        getOptionsFromAttribute(params);
        expect(onIsStringMock).toHaveBeenCalledWith('not a json string');
    });

    it('should return parsed options from attribute', () => {
        (isJsonString as jest.Mock).mockReturnValue(true);
        mockTarget.setAttribute('data-options', '{"key":"value"}');

        const params: GetOptionsParams = {
            target: mockTarget,
            attributeName: 'data-options',
            defaultOptions: {},
        };

        const result = getOptionsFromAttribute(params);
        expect(result).toEqual({key: 'value'});
    });

    it('should convert boolean string to boolean', () => {
        (isJsonString as jest.Mock).mockReturnValue(true);
        mockTarget.setAttribute('data-options', '{"isTrue":"true","isFalse":"false"}');

        const params: GetOptionsParams = {
            target: mockTarget,
            attributeName: 'data-options',
            defaultOptions: {},
        };

        const result = getOptionsFromAttribute(params);
        expect(result).toEqual({isTrue: true, isFalse: false});
    });

    it('should convert specified numeric values to float', () => {
        (isJsonString as jest.Mock).mockReturnValue(true);
        mockTarget.setAttribute('data-options', '{"numericValue":"123.45"}');

        const params: GetOptionsParams = {
            target: mockTarget,
            attributeName: 'data-options',
            defaultOptions: {},
            numericValues: ['numericValue'],
        };

        const result = getOptionsFromAttribute(params);
        expect(result).toEqual({numericValue: 123.45});
    });

    it('should merge default options with parsed options', () => {
        (isJsonString as jest.Mock).mockReturnValue(true);
        mockTarget.setAttribute('data-options', '{"key":"value"}');

        const params: GetOptionsParams = {
            target: mockTarget,
            attributeName: 'data-options',
            defaultOptions: {defaultKey: 'defaultValue'},
        };

        const result = getOptionsFromAttribute(params);
        expect(result).toEqual({defaultKey: 'defaultValue', key: 'value'});
    });
});
