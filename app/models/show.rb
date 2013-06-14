class Show < ActiveRecord::Base
  attr_accessible :ages, :bands, :cancelled, :date, :inout, :notes, :pit, :price, :rec, :sellout, :soldout, :time, :venue

  has_many :saved_shows
  has_many :users, through: :saved_show
end
