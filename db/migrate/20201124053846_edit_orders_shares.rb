class EditOrdersShares < ActiveRecord::Migration[5.2]
  def change
    rename_column :orders, :shares_quanity, :shares_quantity
  end
end
