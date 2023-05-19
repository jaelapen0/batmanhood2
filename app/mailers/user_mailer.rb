class UserMailer < ApplicationMailer
  default from: 'jayswae12@gmail.com'

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

  def updated_balance
    @user = params[:user]
    @amount = params[:amount]
    mail(to: @user.email, subject: 'Updated Account Balance')
  end
end
