class Api::TransactionsController < ApplicationController
    before_action :ensure_logged_in!

    def create
         @transaction = current_user.transactions.new(transaction_params)
        if @transaction.save
            render :show
        else
            render json: @transaction, status: :unprocessable_entity 
        end
    end

    private

    def transaction_params
        params.require(:transaction)
        .permit(
            :user_id,
            :symbol_ticker, 
            :transaction_type,
            :shares_quanity,
            :is_completed,
            :price_per_share
        )
    end
end
