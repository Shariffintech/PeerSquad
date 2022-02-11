Rails.application.routes.draw do
  # set the root path to index.html
  root 'application#index'

  resources :strategies do
    resources :comments
  end
end
