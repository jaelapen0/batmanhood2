class Api::SearchesController < ApplicationController

    def show 
        tags = params["tags"]
      #  debugger
        @stocks = Stock.where('tags ILIKE ?', "%#{tags}%").limit(5)
       # debugger
       # render  json: @stocks
    end
end
