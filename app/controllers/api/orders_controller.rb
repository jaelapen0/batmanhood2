class Api::OrdersController < ApplicationController
    before_action :ensure_logged_in!

    def create
         @order = current_user.order.new(order_params)
        if @order.save
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
            :symbol_ticker, 
            :order_type,
            :shares_quanity,
            :is_completed,
            :price_per_share
        )
    end
end
