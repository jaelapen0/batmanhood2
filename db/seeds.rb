# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#stocks
# stock1 = Stock.create!(ticker_symbol: "AAPL", stock_name: "Apple Inc")
# stock2= Stock.create!(ticker_symbol: "GOOGL", stock_name: "Alphabet Inc Class A")
# stock3= Stock.create!(ticker_symbol: "FB", stock_name: "Facebook Inc Common Stock")
# stock4= Stock.create!(ticker_symbol: "AMZN", stock_name: "Amazon.com Inc")
# stock5= Stock.create!(ticker_symbol: "TSLA", stock_name: "Tesla Inc")
# stock6= Stock.create!(ticker_symbol: "NVDA", stock_name: "NVIDIA Corporation")
# stock7= Stock.create!(ticker_symbol: "CMG", stock_name: "Chipotle Mexican Grill Inc")
# stock8= Stock.create!(ticker_symbol: "NKE", stock_name: "NIKE Inc")
# stock9= Stock.create!(ticker_symbol: "FSLY", stock_name: "Fastly Inc")
# stock10= Stock.create!(ticker_symbol: "BYND", stock_name: "Beyond Meat Inc")

o1 = Order.create!(user_id: 41, order_type: 'buy', shares_quantity: 100, is_completed: true, price_per_share: 120.15, ticker_symbol: 'AAPL')
o2 = Order.create!(user_id: 41, order_type: 'buy', shares_quantity: 10, is_completed: true, price_per_share: 78.15, ticker_symbol: 'FSLY')
o3 = Order.create!(user_id: 41, order_type: 'sell', shares_quantity: 10, is_completed: true, price_per_share: 1781.15, ticker_symbol: 'GOOGL')
o4 = Order.create!(user_id: 41, order_type: 'sell', shares_quantity: 15, is_completed: true, price_per_share: 130.15, ticker_symbol: 'BYND')