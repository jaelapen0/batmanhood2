export const fetchStocks = () => {
    $.ajax({
        method: "GET",
        url: `api/stocks`
    })   
}

export const fetchStock = ticker_symbol => {
    // debugger;
    return $.ajax({
        method: `GET`,
        url: `api/stocks/${ticker_symbol.toUpperCase()}`
    })
}

export const fetchDailyStockData = ticker_symbol => {
    const token = "pk_9e9f3108dcec42ddbcd6bd227b1ddc6c"
    // debugger;
    return $.ajax({ 
        method: 'GET', 
        url: `https://cloud.iexapis.com/stable/stock/${ticker_symbol.toUpperCase()}/intraday-prices?token=${token}&chartIEXOnly=True`})
}

export const fetchWeeklyStockData = ticker_symbol => {
    const token = "pk_9e9f3108dcec42ddbcd6bd227b1ddc6c"
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${ticker_symbol.toUpperCase()}/intraday-prices?token=${token}&chartIEXOnly=True`
    })
}