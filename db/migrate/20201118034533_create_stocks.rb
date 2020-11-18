class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :stock_name, null: false
      t.string :ticker_symbol, null: false
      t.timestamps
    end
  end
end
