class EditOrders3 < ActiveRecord::Migration[5.2]
  def change
    remove_column :orders, :shares_quantity

    add_column :orders, :shares_quantity, :integer
  end
end
