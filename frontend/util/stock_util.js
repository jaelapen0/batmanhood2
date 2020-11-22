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

export const fetchCompanyProfile = ticker_symbol => {
    const token = `566d181c1a1f7b076ecd3598648ea847`
    // debugger
    return $.ajax({
        method: `GET`,
        url: `https://financialmodelingprep.com/api/v3/profile/${ticker_symbol}?apikey=${token}`
    })
}
export const fetchNews = () => {
    const token = "88ee272f7d8e437ea3768f3847c82023"
    return $.ajax({
        method: `GET`,
        url: `https://newsapi.org/v2/everything?q=finance&apiKey=${token}`
    })
}