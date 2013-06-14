class ChangeColumn < ActiveRecord::Migration
  def up
        change_column :shows, :bands, :text, :limit => nil
  end

  def down
  end
end
