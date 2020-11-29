@stocks.each do |stock|
    json.set! stock.id do 
        json.extract! stock, :id, :ticker_symbol, :tags
    end
end