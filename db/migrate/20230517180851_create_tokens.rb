class CreateTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :tokens do |t|

      t.string :name, presence: true
      t.string :token, presence: true
      t.timestamps
    end
  end
end
