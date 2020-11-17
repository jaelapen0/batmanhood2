class EditUsers2 < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :buying_power, :decimal, :default=> 0
  end
end
