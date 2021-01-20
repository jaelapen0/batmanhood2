export const fetchStocks = () => {
    $.ajax({
        method: "GET",
        url: `api/stocks`
    })   
}

export const fetchStock = ticker_symbol => {
    // ;
    return $.ajax({
        method: `GET`,
        url: `api/stocks/${ticker_symbol.toUpperCase()}`
    })
}

export const fetchDailyStockData = ticker_symbol => {
    const token = "pk_9e9f3108dcec42ddbcd6bd227b1ddc6c"
    // ;
    return $.ajax({ 
        method: 'GET', 

        // url: `https://financialmodelingprep.com/api/v3/historical-price-full/stock/${ticker_symbol}?apikey=566d181c1a1f7b076ecd3598648ea847`})
        url: `https://cloud.iexapis.com/stable/stock/${ticker_symbol.toUpperCase()}/intraday-prices?token=${token}&chartIEXOnly=True`})
}

export const fetchHistoricStockData = (ticker_symbol, days) => {
    let currentDate = new Date();
    let pastDate = currentDate;
    let psty = pastDate.setDate(pastDate.getDate() - days);
    let datedPsty = new Date(psty);
    let formattedDate = datedPsty.toISOString().split("T")[0];
    debugger;

    // const token = "pk_9e9f3108dcec42ddbcd6bd227b1ddc6c"
    return $.ajax({
        method: 'GET',
        // url: `https://cloud.iexapis.com/stable/stock/${ticker_symbol.toUpperCase()}/intraday-prices?token=${token}&chartIEXOnly=True`
        url: `https://financialmodelingprep.com/api/v3/historical-chart/15min/${ticker_symbol}?from=${formattedDate}&serietype=line&apikey=566d181c1a1f7b076ecd3598648ea847`
    })
}

// three months
// url: `https://financialmodelingprep.com/api/v3/historical-chart/4hour/AAPL?from=2020-10-15&serietype=line&apikey=566d181c1a1f7b076ecd3598648ea847`
// 1 month:
// https://financialmodelingprep.com/api/v3/historical-chart/4hour/AAPL?from=2020-12-15&serietype=line&apikey=566d181c1a1f7b076ecd3598648ea847

// 5 yr
//https://financialmodelingprep.com/api/v3/historical-chart/4hour/AAPL?from=2016-12-15&serietype=line&apikey=566d181c1a1f7b076ecd3598648ea847


export const fetchCompanyProfile = ticker_symbol => {
    const token = `566d181c1a1f7b076ecd3598648ea847`
    // 
    return $.ajax({
        method: `GET`,
        url: `https://financialmodelingprep.com/api/v3/profile/${ticker_symbol}?apikey=${token}`
    })
}
// export const fetchNews = () => {
//     const token = "88ee272f7d8e437ea3768f3847c82023"
//     return $.ajax({
//         method: `GET`,
//         url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${token}`
//         // url: `https://newsapi.org/v2/everything?q=finance&apiKey=${token}`
//     })
// }

export const fetchNews = () => {
    return $.ajax({
        method: `GET`,
        url: `/api/news`
    })

}

export const fetchCompanyNews = ticker_symbol => {
    return $.ajax({
        method: `GET`,
        url: `/api/news/${ticker_symbol}`
    })

}

export const fetchSearchResults = tags => {
    return $.ajax({
        method: `GET`,
        url: `api/searches/${tags}`
    })
}