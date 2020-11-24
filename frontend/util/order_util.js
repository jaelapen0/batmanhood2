

export const getPortfolio = () => {
    return $.ajax({
        method: `GET`,
        url: '/api/portfolio'
    })
}

export const getOrderHistory = () => {
    return $.ajax({
        method: `GET`,
        url: `/api/orders`
    })
}

export const createOrder = order => {
    return $.ajax({
        method: `POST`,
        url: `/api/orders`,
        data: {order}
    })
}
