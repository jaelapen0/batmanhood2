# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

config.action_mailer.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
   :address => "smtp.gmail.com",
   :port => 25,
   :authentication => :login,
   :user_name => "jayswae12@gmail.com",
   :password => "mndorsejkhmdbqwu"
  }
end