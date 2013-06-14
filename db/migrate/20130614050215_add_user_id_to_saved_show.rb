class AddUserIdToSavedShow < ActiveRecord::Migration
  def change
    add_column :saved_shows, :user_id, :integer
  end
end
