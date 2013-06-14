class SavedShow < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :show
  belongs_to :user
end
