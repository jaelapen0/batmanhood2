

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

export const getBuyingPower = currentId => {
    return $.ajax({
        method: `GET`,
        url: `/api/users/${currentId}`
     })
}

export const updateBuyingPower = (currentId, buyingPower) => (
    $.ajax({
        method: `PATCH`,
        url: `/api/users/${currentId}`,
        data: { [currentId.buyingPower]: buyingPower }
    })
)