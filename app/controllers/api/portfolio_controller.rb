class Api::PortfolioController < ApplicationController
     def index
        # debugger;
        @portfolio = current_user.stocks

        @orders = current_user.orders
        @info = [@orders, @portfolio]
        render json: @info
    end
end
