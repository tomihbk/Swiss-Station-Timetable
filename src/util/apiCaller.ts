import axios, { AxiosResponse } from 'axios';
import { ApiBodyTypeData } from '../state/action-types';

const apiCaller = async (data: ApiBodyTypeData, callback: (res: AxiosResponse) => void, errorcallback: (err: AxiosResponse) => void): Promise<void> => {
    await axios({
        method: "post",
        url: process.env.REACT_APP_TRANSPORT_API_URL,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    })
        .then(res => {
            if (callback != null) {
                callback(res);
            }
        })
        .catch(err => {
            if (errorcallback != null) {
                errorcallback(err);
            }
        })
}
export default apiCaller
