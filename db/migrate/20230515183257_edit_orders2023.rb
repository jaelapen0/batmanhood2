class EditOrders2023 < ActiveRecord::Migration[6.1]
  def change
    # change_column :users, :buying_power, :decimal, :default=> 100000
    rename_column :orders, :symbol_ticker, :ticker_symbol
  end
end
