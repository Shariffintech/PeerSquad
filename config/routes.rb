Rails.application.routes.draw do
  # set the root path
  root 'strategies#index'
  
  resources :strategies do
    resources :comments
  end
end
