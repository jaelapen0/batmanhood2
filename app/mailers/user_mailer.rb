class UserMailer < ApplicationMailer
  default from: 'jaysway12@gmail.com'

  def welcome_email
    @user = params[:user]
    @url  = 'https://batmanhood.herokuapp.com/#/login'
    mail(to: @user.email, subject: 'Welcome to Batmanhood!')
  end

  def order_email
    @user = params[:user]
    @order = params[:order]
    mail(to: @user.email, subject: 'Order Confirmation')
  end
end
