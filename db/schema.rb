# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_05_15_183257) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "orders", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "ticker_symbol", null: false
    t.string "order_type", null: false
    t.boolean "is_completed", null: false
    t.decimal "price_per_share", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "shares_quantity"
    t.index ["ticker_symbol"], name: "index_orders_on_ticker_symbol"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "stock_name", null: false
    t.string "ticker_symbol", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "tags"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "session_token"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "buying_power", default: "0.0"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "watchlists", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "ticker_symbol", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ticker_symbol"], name: "index_watchlists_on_ticker_symbol"
    t.index ["user_id", "ticker_symbol"], name: "index_watchlists_on_user_id_and_ticker_symbol", unique: true
    t.index ["user_id"], name: "index_watchlists_on_user_id"
  end

end
