class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(
            params[:user][:email], 
            params[:user][:password]
        )
        if @user
            login!(@user)
            current_user = @user;
            # redirect_to "/"
            render "api/users/show"
        else 
            
            # flash.now[:error] =  @user.errors.full_messages 
             render json: ["Invalid email/password combination"], status: 401
        end
    end

    def destroy
        @user = current_user
        if @user
            logout!
            render "api/users/show"
        else
            render json: ["Nobody signed in"], status: 404
        end
    end
end
