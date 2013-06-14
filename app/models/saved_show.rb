class SavedShow < ActiveRecord::Base
  attr_accessible :show_id, :user_id
  belongs_to :show
  belongs_to :user






end