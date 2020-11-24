class Transaction < ApplicationRecord
    validates :user_id, :ticker_symbol, :transaction_type, :shares_quanity, :is_completed, :price_per_share, presence: true
    belongs_to :buyer, class_name: :User, foreign_key: :user_id
    belongs_to :stock, class_name: :Stock, foreign_key: :ticker_symbol primary_key: :ticker_symbol


end
