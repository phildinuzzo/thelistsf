class ChangeBandsField < ActiveRecord::Migration
  def up
    change_column(:shows, :bands, :text)
  end

  def down
  end
end
