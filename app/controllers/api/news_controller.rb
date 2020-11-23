require 'open-uri'

class Api::NewsController < ApplicationController
     def index
    #    https://newsapi.org/v2/everything?q=finance
        # url = "http://newsapi.org/v2/top-headlines?country=us&apiKey=88ee272f7d8e437ea3768f3847c82023"
        url = "https://newsapi.org/v2/everything?q=wall%20street&apiKey=88ee272f7d8e437ea3768f3847c82023"
        @response = JSON.parse(open(url).read)
        render json: @response
    end

    def show
        ticker_symbol = params["ticker_symbol"]
        url = "https://newsapi.org/v2/everything?q=#{ticker_symbol}&apiKey=88ee272f7d8e437ea3768f3847c82023"
        @response = JSON.parse(open(url).read)
        # debugger
        render json: @response
    end

    # private
    # def news_params
    #     params.require(:news).permit(:ticker_symbol)
    # end

end
