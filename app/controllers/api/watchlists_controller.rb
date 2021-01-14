class Api::WatchlistsController < ApplicationController

    def create 
        @watchlist = Watchlist.new(watchlist_params)
        @watchlist.user_id = current_user.id
        if @watchlist.save
            render json: @watchlist
        else
            render json: @watchlist.errors.full_messages , status: 422
        end
    end

     def show
        @watchlist = Watchlist.where(user_id: current_user.id).where(ticker_symbol: params[:id])
        render json: @watchlist
    end

    def index
        @watchlists = Watchlist.where(user_id: current_user.id)
        ;
        render json: @watchlists
    end

    def destroy
      @watchlist = Watchlist.where(user_id: current_user.id).where(ticker_symbol: params[:id])
      @watchlist.destroy(@watchlist[0].id)
      render json: @watchlist
    end
   private

   def watchlist_params
      params.permit(:ticker_symbol, :user_id)
      # params.require(:stock).permit(:stock_name, :ticker_symbol)
   end
end
