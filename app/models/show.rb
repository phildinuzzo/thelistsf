class Show < ActiveRecord::Base
  attr_accessible :created_at, :ages, :bands, :cancelled, :date, :sortdate, :inout, :notes, :pit, :price, :rec, :sellout, :soldout, :time, :venue

  has_many :saved_shows
  has_many :users, through: :saved_show


  # def date
  #   if self[:date] != nil
  #   read_attribute(:date, Date.parse(self.date))
  # end
  # end

  # def date=(date)
  #   self[:date] = Date.parse(Date.parse(date).strftime('%d %b'))
  # end

  # def date
  #   if self[:date] != nil
  #     # Date.parse(Date.parse(self[:date]).strftime('%d %m'))
  #     read_attribute(:date, Date.parse(self[:date]))
  #   end
  # end

# def name=(name)
#   write_attribute(:name, name.capitalize)
# end


end
