class Order < ApplicationRecord
    validates :user_id, :ticker_symbol, :order_type, :shares_quantity, :is_completed, :price_per_share, presence: true
    belongs_to :buyer, class_name: :User, foreign_key: :user_id
    belongs_to :stock, class_name: :Stock, foreign_key: :ticker_symbol, primary_key: :ticker_symbol


end
