export interface GetOptionsParams {
    target: HTMLElement | null;
    attributeName?: string;
    defaultOptions?: Record<string, any>;
    numericValues?: string[];
    onIsString?: (data: string) => void;
    dev?: boolean;
}