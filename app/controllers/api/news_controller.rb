require 'open-uri'

class Api::NewsController < ApplicationController
     def index
       
        url = "http://newsapi.org/v2/top-headlines?country=us&apiKey=88ee272f7d8e437ea3768f3847c82023"
        @response = JSON.parse(open(url).read)
        render json: @response
    end

end
