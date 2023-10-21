import { AppStrings } from "./AppStrings";

export const AppFunctions = {
    sds_wrapper: (api: string) => AppStrings.sds_base_url + api,
    validataSds: (result: any) => result.code === 0,
    mapSds: (response: any) => {
        const result = response.result;
        if (!result) return response;
        const { cols, rows } = result;
        if (!cols) return rows || result;
        const keys = Object.keys(cols);
        const mapped_data = result.rows.map((row: any) => {
            const values = Object.values(row);
            return values.reduce((a: any, it, index) => ({ ...a, [keys[index]]: it }), {});
        });

        return mapped_data;
    }

}