import instance from "./instance";


export const listProduct:any = () => {
    const url = `/products`;
    return instance.get(url);
}

export const add:any = (product:any) => {
    const url = `/products`;
    return instance.post(url, product);
}