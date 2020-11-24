class EditTransaction2 < ActiveRecord::Migration[5.2]
  def change
     remove_column :transactions, :ticker_symbol
    add_column :transactions, :ticker_symbol, :string, null: false
    add_index :transactions, :ticker_symbol
  end
end
