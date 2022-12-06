
import instance from "./instance";

export const create_url = (data:any) => {
    const url = `/create_payment_url`
    return instance.post(url, data)
}

export const redirect_url = () => {
    const url = `/create_payment_url`
    return instance.get(url)
}

export const vnpay_return  = () => {
    const url = `/vnpay_return`
    return instance.get(url)
}
