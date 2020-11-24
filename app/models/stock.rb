class Stock < ApplicationRecord
    validates :stock_name, :ticker_symbol, presence: true, uniqueness: true

    has_many :orders, class_name: :Order, foreign_key: :ticker_symbol
    has_many :buyers, through: :orders, source: :user_id
end
