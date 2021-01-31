Rails.application.routes.draw do
  get "sessions/create"
  get "sessions/destroy"
  resources :versions
  resources :musics
  resources :discs
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :disc
  resources :music
  resources :version
end
