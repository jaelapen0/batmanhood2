require 'open-uri'

class Api::NewsController < ApplicationController
     def index
    #    https://newsapi.org/v2/everything?q=finance
        # url = "http://newsapi.org/v2/top-headlines?country=us&apiKey=88ee272f7d8e437ea3768f3847c82023"
        # url = "https://newsapi.org/v2/everything?q=wall%20street&apiKey=88ee272f7d8e437ea3768f3847c82023"
        
        url = "https://gnews.io/api/v4/search?q=stocks%20market&token=4d1d5f41f2ed41278fa8b717da618ab6&lang=en"
        @response = JSON.parse(URI.open(url).read)
        render json: @response
    end

    def show
        ticker_symbol = params["ticker_symbol"]
        url = "https://newsapi.org/v2/everything?q=#{ticker_symbol}&apiKey=88ee272f7d8e437ea3768f3847c82023"
        @response = JSON.parse(URI.open(url).read)
        # 
        render json: @response
    end

    # private
    # def news_params
    #     params.require(:news).permit(:ticker_symbol)
    # end

end
