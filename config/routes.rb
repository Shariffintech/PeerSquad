Rails.application.routes.draw do
  
  resources :strategies do
    resources :comments
  end
end
