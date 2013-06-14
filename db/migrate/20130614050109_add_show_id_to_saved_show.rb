class AddShowIdToSavedShow < ActiveRecord::Migration
  def change
    add_column :saved_shows, :show_id, :integer
  end
end
