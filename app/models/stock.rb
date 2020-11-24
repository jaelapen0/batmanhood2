class Stock < ApplicationRecord
    validates :stock_name, :ticker_symbol, presence: true, uniqueness: true
    has_many :transactions, class_name: :Transaction, foreign_key: :ticker_symbol
    has_many :buyers, through: :transactions, source: :user_id
end
