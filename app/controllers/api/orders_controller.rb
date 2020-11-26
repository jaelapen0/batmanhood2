class Api::OrdersController < ApplicationController
    before_action :ensure_logged_in!

    def create
        debugger
        # order_params["price_per_share"] = order_params["price_per_share"].to_f
        # order_params["shares_quantity"] = order_params["shares_quantity"].to_i
         @order = Order.new(order_params)

         debugger
        if @order.save!
            render json: @order
        else
            render json: @order, status: :unprocessable_entity 
        end
    end

    def index
        @orders = current_user.orders
        render json: @orders
    end

    def stocks
        @stocks = current_user.orders.stocks
        render json.stocks
    end
    private

    def order_params
        params.require(:order)
        .permit(
            :user_id,
            :ticker_symbol, 
            :order_type,
            :shares_quantity,
            :is_completed,
            :price_per_share
        )
    end
end
