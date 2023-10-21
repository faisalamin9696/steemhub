import { AppFunctions } from "../constants/AppFunctions";


export const getActivePostsBy = async (
    category: 'Trending' | 'Created' | 'Hot' = 'Trending',
    observer: string = 'null',
    bodyLength: number = 250,
    limit: number = 10,
): Promise<Feed[]> => {
    try {
        const R_API = `/feeds_api/getActivePostsBy${category}/${observer ?? 'null'}/${bodyLength}/${limit}`;
        console.log(R_API);
        const response = await fetch(AppFunctions.sds_wrapper(R_API));

        if (response.ok) {
            const result = await response.json();
            if (AppFunctions.validataSds(result)) {
                const mappedData = AppFunctions.mapSds(result) as Feed[];
                return mappedData;
            } else {
                throw new Error(result.error!);
            }
        } else {
            throw new Error(`HTTP error: ${response.status}`);
        }
    } catch (error: any) {
        console.error('Failed to fetch post:', error);
        throw new Error(error);
    }
};


export const getActiveAuthorPosts = async (
    author: string,
    observer: string = 'null',
    bodyLength: number = 250,
    limit: number = 1000,
): Promise<Feed[]> => {
    try {
        const R_API = `/feeds_api/getActivePostsByAuthor/${author}/${observer ?? 'null'}/${bodyLength}/${limit}`;
        console.log(R_API);
        const response = await fetch(AppFunctions.sds_wrapper(R_API));

        if (response.ok) {
            const result = await response.json();
            if (AppFunctions.validataSds(result)) {
                const mappedData = AppFunctions.mapSds(result) as Feed[];
                return mappedData;
            } else {
                throw new Error(result.error!);
            }
        } else {
            throw new Error(`HTTP error: ${response.status}`);
        }
    } catch (error: any) {
        console.error('Failed to fetch post:', error);
        throw new Error(error);
    }
};

export const getAccountExt = async (
    author: string,
    observer: string = 'null',
    bodyLength: number = 250,
    limit: number = 1000,
): Promise<AccountExt> => {
    try {
        const R_API = `/accounts_api/getAccountExt/${author}/${observer ?? 'null'}`;
        console.log(R_API);
        const response = await fetch(AppFunctions.sds_wrapper(R_API));

        if (response.ok) {
            const result = await response.json();
            if (AppFunctions.validataSds(result)) {
                const mappedData = AppFunctions.mapSds(result) as AccountExt;
                return mappedData;
            } else {
                throw new Error(result.error!);
            }
        } else {
            throw new Error(`HTTP error: ${response.status}`);
        }
    } catch (error: any) {
        console.error('Failed to fetch post:', error);
        throw new Error(error);
    }
};