export function mapSds(response: any) {
    const result = response.result;
    if (!result) {
        return response;
    }

    const { cols, rows } = result;
    if (!cols) {
        return rows || result;
    }

    const keys = Object.keys(cols);
    const mapped_data: any[] = [];

    result.rows.forEach((row: any) => {
        const values: any = Object.values(row);
        const mapped = values.reduce(
            (a: any, it: any, index: number) => ({ ...a, [keys[index]]: it }),
            {},
        );
        mapped_data.push(mapped);
    });

    return mapped_data;
}

export function validateSds(result: any) {
    return result.code === 0;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
