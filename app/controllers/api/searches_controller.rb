class Api::SearchesController < ApplicationController

    def index 
        tags = params["tags"]
        
        @stocks = Stock.where('tags ILIKE ?', "%#{t}%").limit(5)
    end
end
