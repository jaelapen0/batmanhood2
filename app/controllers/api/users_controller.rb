class Api::UsersController < ApplicationController
    # skip_before_action :verify_authenticity_token
   def create 
      
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages , status: 422
        end
    end

    def show
        @user = User.find(params[:id])
        # 
      
        render "api/users/buying_power"
    end

    def update
        @user = User.find(params[:id])
        # 
        # if @user.update(params)

        @user.buying_power = params["undefined"]["buying_power"]
        if @user.save
            # ;
            render "api/users/buying_power"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end
   

    private

    def user_params
        params.require(:user).permit( :email, :first_name, :last_name, :password, :buying_power)
    end

end
