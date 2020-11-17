class EditUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :buying_power
    add_column :users, :buying_power, :decimal
  end
end
