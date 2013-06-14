Thelistsf::Application.routes.draw do
  resources :shows

  post '/save_show' => 'shows#save_show'

  root :to => "home#index"
  resources :users, :only => [:index, :show, :edit, :update ]
  match '/auth/:provider/callback' => 'sessions#create'
  match '/signin' => 'sessions#new', :as => :signin
  match '/signout' => 'sessions#destroy', :as => :signout
  match '/auth/failure' => 'sessions#failure'
  get '/saved' => 'shows#saved'
end
