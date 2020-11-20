export const fetchStocks = () => {
    return {
        method: "GET",
        url: `api/stocks`
    }   
}

export const fetchStock = stockId => {
    return {
        method: `GET`,
        url: `api/stocks/${stockId}`
    }
}
