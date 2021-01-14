Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :stocks, param: :ticker_symbol, only: [:create, :show, :index]
    resources :news, param: :ticker_symbol, only:[:index, :show]
    resources :searches, param: :tags, only: [:show]
    resources :orders, only: [:create, :index]
    resources :portfolio, only: [:index]
    resources :watchlists, only: [:create, :index, :show, :destroy]
  end
  root to: "static_pages#root"
end
