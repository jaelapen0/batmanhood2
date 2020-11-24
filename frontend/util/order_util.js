

export const userPortfolio = () => {
    return $.ajax({
        method: `GET`,
        url: '/api/portfolio'
    })
}

export const userOrders = () => {
    return $.ajax({
        method: `GET`,
        url: `/api/orders`
    })
}