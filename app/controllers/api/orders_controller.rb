class Api::OrdersController < ApplicationController
    before_action :ensure_logged_in!

    def create
         @order = Order.new(order_params)
        if @order.save!
            UserMailer.with(user: current_user, order: @order).order_email.deliver_now
            render json: @order
        else
            render json: @order, status: :unprocessable_entity 
        end
    end

    def index
        @orders = current_user.orders
        render json: @orders
    end

    def show

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
            :price_per_share,
            # :buying_power, 
            # :errors, 
            # :sharesOwned
        )
    end
end
