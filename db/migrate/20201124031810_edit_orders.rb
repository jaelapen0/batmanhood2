class EditOrders < ActiveRecord::Migration[5.2]
  def change
    rename_column :orders, :transaction_type, :order_type
  end
end
