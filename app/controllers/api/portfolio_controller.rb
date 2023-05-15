class Api::PortfolioController < ApplicationController
     def index
        # ;
        @portfolio = current_user.stocks

        @orders = current_user.orders
        @info = [@orders, @portfolio]
        debugger
        render json: @info
    end
end
