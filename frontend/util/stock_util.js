export const fetchStocks = () => {
    $.ajax({
        method: "GET",
        url: `api/stocks`
    })   
}

export const fetchStock = ticker_symbol => {
    return $.ajax({
        method: `GET`,
        url: `api/stocks/${ticker_symbol.toUpperCase()}`
    })
}

export const fetchDailyStockData = (ticker_symbol, days = 1) => {
    let currentDate = new Date();
    let pastDate = currentDate;
    let psty = pastDate.setDate(pastDate.getDate() - days);
    let datedPsty = new Date(psty);
    let formattedDate = datedPsty.toISOString().split("T")[0];
    return $.ajax({ 
        method: 'GET', 
        url: `https://financialmodelingprep.com/api/v3/technical_indicator/1min/${ticker_symbol}?period=10&type=ema&apikey=${localStorage.historic}`})
        // url: `https://financialmodelingprep.com/api/v3/historical-chart/5min/${ticker_symbol}?apikey=${localStorage.historic}`})
        // url: `https://financialmodelingprep.com/api/v3/historical-chart/5min/${ticker_symbol}&apikey=${localStorage.historic}`})
}

export const fetchHistoricStockData = (ticker_symbol, days) => {
    let currentDate = new Date();
    let pastDate = currentDate;
    let psty = pastDate.setDate(pastDate.getDate() - days);
    let datedPsty = new Date(psty);
    let formattedDate = datedPsty.toISOString().split("T")[0];

    if (days < 15){
        return $.ajax({
            method: 'GET',
            url: `https://financialmodelingprep.com/api/v3/historical-chart/15min/${ticker_symbol}?from=${formattedDate}&serietype=line&apikey=${localStorage.historic}`
        })
    }

    if (days > 100) {
        return $.ajax({
            method: 'GET',
            url: `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker_symbol}?from=${formattedDate}&apikey=${localStorage.historic}`
        })
    }
    return $.ajax({
        method: 'GET',
        url: `https://financialmodelingprep.com/api/v3/historical-chart/4hour/${ticker_symbol}?from=${formattedDate}&serietype=line&apikey=${localStorage.historic}`
    })
}

export const fetchCompanyProfile = ticker_symbol => {
    return $.ajax({
        method: `GET`,
        url: `https://financialmodelingprep.com/api/v3/profile/${ticker_symbol}?apikey=${localStorage.historic}`
    })
}

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