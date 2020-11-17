class Api::UsersController < ApplicationController
    # skip_before_action :verify_authenticity_token
   def create
   # debugger;
        @user = User.new(params)
        if @user.save
            login!(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :first_name, :last_name, :password)
    end
end
