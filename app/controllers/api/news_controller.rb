require 'open-uri'

class Api::NewsController < ApplicationController
    def index
        token = Token.where(name: "news_index").first.token
        url = "https://gnews.io/api/v4/search?q=stocks%20market&token=#{token}&lang=en"
        @response = JSON.parse(URI.open(url).read)
        render json: @response
    end

    def show
        ticker_symbol = params["ticker_symbol"]
        token = Token.where(name: "news_show").first.token
        url = "https://newsapi.org/v2/everything?q=#{ticker_symbol}&apiKey=#{token}"
        @response = JSON.parse(URI.open(url).read)
        render json: @response
    end
end
