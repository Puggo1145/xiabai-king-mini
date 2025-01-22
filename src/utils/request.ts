interface ResponseData<T = any> {
    code: number;
    success: boolean;
    message?: string;
    data?: T;
}

interface RequestOptions extends UniApp.RequestOptions {
    showError?: boolean; // 是否显示错误提示，默认为 true
    retry?: number; // 重试次数，默认为 0
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_ERROR_MESSAGE = '网络错误，请稍后重试';
const DEFAULT_BUSINESS_ERROR_MESSAGE = '服务器错误，请稍后重试';
const RETRY_DELAY = 1000; // 重试延迟时间（毫秒）

// 处理错误提示
const showErrorMessage = (message: string) => {
    uni.showToast({
        title: message,
        icon: 'none',
        duration: 2000
    });
};

// 处理响应数据
const handleResponse = <T>(response: UniApp.RequestSuccessCallbackResult, options: RequestOptions): Promise<T> => {
    const { code, success, message, data } = response.data as ResponseData<T>;
    
    // 处理非 0 状态码
    if (code !== 0) {
        const errorMessage = `请求失败: ${message}`;
        if (options.showError !== false) {
            showErrorMessage(errorMessage);
        }
        return Promise.reject(new Error(errorMessage));
    }
    
    // 请求成功但业务失败
    if (!success) {
        const errorMessage = message || DEFAULT_BUSINESS_ERROR_MESSAGE;
        if (options.showError !== false) {
            showErrorMessage(errorMessage);
        }
        return Promise.reject(new Error(errorMessage));
    }
    
    // 请求成功且业务成功
    return Promise.resolve(data as T);
};

// 发起请求
const request = <T = any>(options: RequestOptions): Promise<T> => {
    const retryCount = options.retry || 0;
    let currentRetry = 0;
    
    // 添加 access_token 到 header
    const accessToken = uni.getStorageSync("access_token") || null;
    if (accessToken) {
        options.header = {
            ...options.header,
            Authorization: `Bearer ${accessToken}`
        };
    }

    const makeRequest = (): Promise<T> => {
        return new Promise((resolve, reject) => {
            uni.request({
                ...options,
                url: BASE_URL + options.url,
                success: (response) => {
                    handleResponse<T>(response, options)
                        .then(resolve)
                        .catch(reject);
                },
                fail: (error) => {
                    // 处理网络错误
                    const message = error.errMsg || DEFAULT_ERROR_MESSAGE;
                    
                    // 如果还有重试次数，则重试
                    if (currentRetry < retryCount) {
                        currentRetry++;
                        setTimeout(() => {
                            makeRequest()
                                .then(resolve)
                                .catch(reject);
                        }, RETRY_DELAY);
                        return;
                    }
                    
                    if (options.showError !== false) {
                        showErrorMessage(message);
                    }
                    reject(new Error(message));
                }
            });
        });
    };
    
    return makeRequest();
};

// 导出 HTTP 方法封装
export const http = {
    get: <T = any>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'data' | 'method'> = {}) => {
        return request<T>({
            url,
            data,
            method: 'GET',
            ...options
        });
    },
    
    post: <T = any>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'data' | 'method'> = {}) => {
        return request<T>({
            url,
            data,
            method: 'POST',
            ...options
        });
    },
    
    // put: <T = any>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'data' | 'method'> = {}) => {
    //     return request<T>({
    //         url,
    //         data,
    //         method: 'PUT',
    //         ...options
    //     });
    // },
    
    // delete: <T = any>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'data' | 'method'> = {}) => {
    //     return request<T>({
    //         url,
    //         data,
    //         method: 'DELETE',
    //         ...options
    //     });
    // }
};

export default request;
