class EditWatchlist < ActiveRecord::Migration[5.2]
  def change
     add_index :watchlists, [:user_id, :ticker_symbol], unique: true
  end
end
