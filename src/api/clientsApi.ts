import { response } from '../mockData';

export const listClientsAPI = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(response);
        }, 2000);
    });
};
