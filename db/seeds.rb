# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#stocks
stock1 = Stock.create!(stock_name: "AAPL", ticker_symbol: "Apple Inc")
stock2= Stock.create!(stock_name: "GOOGL", ticker_symbol: "Alphabet Inc Class A")
stock3= Stock.create!(stock_name: "FB", ticker_symbol: "Facebook Inc Common Stock")
stock4= Stock.create!(stock_name: "AMZN", ticker_symbol: "Amazon.com Inc")
stock5= Stock.create!(stock_name: "TSLA", ticker_symbol: "Tesla Inc")
stock6= Stock.create!(stock_name: "NVDA", ticker_symbol: "NVIDIA Corporation")
stock7= Stock.create!(stock_name: "CMG", ticker_symbol: "Chipotle Mexican Grill Inc")
stock8= Stock.create!(stock_name: "NKE", ticker_symbol: "NKE Inc")
stock9= Stock.create!(stock_name: "FSLY", ticker_symbol: "Fastly Inc")
stock10= Stock.create!(stock_name: "BYND", ticker_symbol: "Beyond Meat Inc")