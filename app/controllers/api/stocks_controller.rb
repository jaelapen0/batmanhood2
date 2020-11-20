class Api::StocksController < ApplicationController
        
    def show
        @stock = Stock.find_by(params[:id])
        render json: @stock
    end

    private

    def stock_params
        params.require(:stock).permit(:stock_name, :ticker_symbol)
    end
end
