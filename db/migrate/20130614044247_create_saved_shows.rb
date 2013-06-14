class CreateSavedShows < ActiveRecord::Migration
  def change
    create_table :saved_shows do |t|

      t.timestamps
    end
  end
end
