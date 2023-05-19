class Api::SearchesController < ApplicationController

    def show 
      tags = params["tags"]
      @stocks = Stock.where('tags ILIKE ?', "%#{tags}%").limit(5)
    end
end
