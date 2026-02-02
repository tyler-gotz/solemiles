export const getApiServer = () => {
    const { protocol, hostname } = window.location;

    const port = import.meta.env.DEV ? ':3000' : '';
    const apiPath = '/api';

    return `${protocol}//${hostname}${port}${apiPath}`;
}