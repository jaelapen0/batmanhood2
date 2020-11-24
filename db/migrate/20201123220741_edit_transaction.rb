class EditTransaction < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :symbol_ticker
    add_column :transactions, :ticker_symbol, :string
    add_index :transactions, :ticker_symbol
  end
end
