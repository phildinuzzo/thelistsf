class CreateShows < ActiveRecord::Migration
  def change
    create_table :shows do |t|
      t.string :date
      t.string :bands
      t.string :venue
      t.string :ages
      t.string :price
      t.string :time
      t.boolean :pit
      t.boolean :inout
      t.boolean :sellout
      t.string :rec
      t.boolean :soldout
      t.string :notes
      t.boolean :cancelled

      t.timestamps
    end
  end
end
