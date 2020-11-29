class AddStockTags < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :tags, :string
  end
end
