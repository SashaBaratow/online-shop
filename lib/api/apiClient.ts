export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

type Query = Record<string, string | number | boolean | undefined>;

function toQueryString(query?: Query) {
    if (!query) return '';

    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value === undefined) return;
        params.set(key, String(value));
    });

    const qs = params.toString();
    return qs ? `?${qs}` : '';
}

const BASE_URL = '/api';

export const apiClient = {
    async get<T>(path: string, query?: Query): Promise<T> {

        const url = `${BASE_URL}${path}${toQueryString(query)}`;

        const res = await fetch(url);

        if (!res.ok) {
            let message = res.statusText;

            try {
                const data = await res.json();
                if (data?.message) message = data.message;
            } catch {

            }

            throw new ApiError(message || 'Request failed', res.status);
        }

        return (await res.json()) as T;
    },
};
