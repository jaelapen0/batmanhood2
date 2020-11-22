class Api::StocksController < ApplicationController
        
    def show
        @stock = Stock.find_by(ticker_symbol: params[:ticker_symbol])
        render json: @stock
    end

    def index
        @stocks = Stock.all
        render json: @stocks
    end
    private

    def stock_params
        params.require(:stock).permit(:stock_name, :ticker_symbol)
    end
end
