class Watchlist < ApplicationRecord
   validates :user_id, :ticker_symbol, presence: true
   belongs_to :watcher, class_name: :User, foreign_key: :user_id
   has_many :stocks, class_name: :Stock, foreign_key: :ticker_symbol, primary_key: :ticker_symbol

end