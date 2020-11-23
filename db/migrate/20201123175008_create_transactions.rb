class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false
      t.string :symbol_ticker, null: false
      t.string :transaction_type , null: false
      t.string :shares_quanity, null: false
      t.boolean :is_completed, null: false
      t.decimal :price_per_share, null: false

      t.timestamps
    end

    add_index :transactions, :symbol_ticker
    add_index :transactions, :user_id
  end
end
