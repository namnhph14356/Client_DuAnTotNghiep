import instance from "./instance";

export const payment = (payment) => {
    const url = `/pay`;
    return instance.post(url, payment);
}