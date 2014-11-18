class AddFieldnameToTablename < ActiveRecord::Migration
  def change
    add_column :shows, :sortdate, :datetime
  end
end
