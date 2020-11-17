class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, presence: true
      t.string :first_name, presence: true
      t.string :last_name, presence: true
      t.decimal :buying_power, presence: true
      t.string :session_token, presence: true
      t.string :password_digest, presence: true
      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
