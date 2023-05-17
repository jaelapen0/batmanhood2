class Api::TokensController < ApplicationController

  def index
    @tokens = Token.where('name ILIKE ?', "%stock%")
    render json: @tokens
  end
end
