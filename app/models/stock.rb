class Stock < ApplicationRecord
    validates :stock_name, :ticker_symbol, presence: true, uniqueness: true
    
end
