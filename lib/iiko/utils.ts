export const axiosToCurl = (config: any) => {
    // Start with the base curl command
    let curl = 'curl';

    // Add method if not GET
    if (config.method && config.method.toUpperCase() !== 'GET') {
        curl += ` -X ${config.method.toUpperCase()}`;
    }

    // Add URL
    const url = config.baseURL ? `${config.baseURL}${config.url}` : config.url;
    curl += ` '${url}'`;

    // Add headers
    if (config.headers) {
        Object.entries(config.headers).forEach(([key, value]) => {
            curl += ` -H '${key}: ${value}'`;
        });
    }

    // Add data/body
    if (config.data) {
        const data = typeof config.data === 'string'
            ? config.data
            : JSON.stringify(config.data);
        curl += ` -d '${data}'`;
    }

    // Add query parameters
    if (config.params) {
        const queryString = new URLSearchParams(config.params).toString();
        if (queryString) {
            curl += url.includes('?') ? `&${queryString}` : `?${queryString}`;
        }
    }

    return curl;
};