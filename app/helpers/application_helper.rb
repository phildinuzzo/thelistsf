require 'open-uri'
require 'date'

module ApplicationHelper

  def get_raw

	  data = []
    data2 =[]
    shows = []
    showsArray = [[]]

    venuesRaw = open("venues.txt").read   #uses stored list of known venues
    venuesRaw.gsub!(/\s\*\s/, ")|(?:")

    days = "mon|tue|wed|thr|fri|sat|sun"
    months = "jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec"

    raw = open("http://www.stevelist.com/list").read

    #remove text below shows list
    raw.split(/\*\s*recommendable/).each do |r|
      data << r
    end

    #remove text above shows list
    data[0].split(/Upcoming shows of interest\s+\w{3,}\s+\d{1,2}\,\s+\d{4}/).each do |r|
      data2 << r
    end
    #separate each show into its own array entry
    data2[1].split(/(?=(?:#{months})\s{1,}\d\d?(?:\/?\d?\d?){1,4}\s{1,})/).each do |r|
      a = Array.new
      a << r
      shows << a
    end
    shows.shift     #remove first array entry - it is "/n/n"

    #each show in its own array within shows array, \n's removed!
    shows.each do |v|
      a = v[0]
      b = a.gsub(/\n|\t/, " ").strip
      b.gsub!(/\s{2,}/, " ")
      showsArray << b
    end
    showsArray.shift    #remove empty entry\

  # ******** for showing formatted entries *******
  # showsArray.each do |i|
  #  p i
  # end

    #setting up hashes for each show with array
    masterArray = []
    showsArray.size.times do
      masterArray << {
        :date => nil, :bands => nil,
        :venue => nil,
        :ages => nil, :price => nil, :time => nil,
        :pit => nil, :inout => nil,
        :sellout => nil, :rec => nil,
        :soldout => nil, :notes => nil, :cancelled => nil
      }
    end

    #The rest of this code will slice off parts of each show string
    # and place them within pre-made hashes with masterArray
    showsArray.size.times do |i|
      a = showsArray[i][/(#{months})\s\d+(\/?\d?\d?){1,4}\s+(#{days})?/]
        if a.to_s.match(/\//)
          b = a.to_s[/\d\d?(\/\d\d?[^\/])/]
          b.gsub!(/\//, "-")
          b.gsub!(/\s/, "")
          a2 = Date.parse(a)
          a3 = a2.strftime('%a, %b ')
          a4 = a3.to_s
          c = a4 + b
        else
          b = Date.parse(a)
          c = b.strftime('%a, %b %d, %Y')
        end
      masterArray[i][:date] = c
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/(?:#{months})\s{1,2}\d{1,2}(?:\/?\d?\d?){1,4}\s+(?:#{days})?(.*?(?:(?=\sat\s)|(?=#{venuesRaw})))/, 1]
      b = a.to_s.strip
      b.gsub!(/\s{2,}/, " ")
      masterArray[i][:bands] = b
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/(#{venuesRaw})/]
        b = a.to_s.gsub(/^\s*\w/){|match| match.upcase}
      if a == nil
        a = showsArray[i][/\sat\s(.*)\s(?:(?:a\/a\s)|(?:\d\d?\+))/, 1]
        b = a.to_s.gsub(/^\s*\w/){|match| match.upcase}
      end
      masterArray[i][:venue] = b
      i += 1
     end

    showsArray.size.times do |i|
      a = showsArray[i][/(a\/a)|(6?(16)?(18)?(21)?\+)/]
      masterArray[i][:ages] = a
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/(?:(a\/a)|(1?\d?{1}\+))?(free)|((\${1}\d\d?\d?)(\-?\$?\d?\d?\d?)(\/?\$?\d?\d?\d?){0,5})/]
      masterArray[i][:price] = a
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/(\d{1,2}\:?\d{0,2}(pm|am)\/?\s?\d{0,2}\:?\d{0,2}(pm|am)?)/]
      b = a.to_s.strip
      masterArray[i][:time] = b
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/@/]
      if a == nil
        b = false
      else
        b = true
      end
      masterArray[i][:pit] = b
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/#/]
      if a == nil
        b = false
      else
        b = true
      end
      masterArray[i][:inout] = b
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/\$\s/]
      if a == nil
        b = false
      else
        b = true
      end
      masterArray[i][:sellout] = b
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/\*{2,5}/]
      masterArray[i][:rec] = a
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/(?:\*+\s.*)(\(.*sold out.*\))/, 1]
      if a == nil
        b = false
      else
        b = true
      end
      masterArray[i][:soldout] = b
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/(?:\*+\s.*)(?!.*sold out)(\(.*\))/, 1]
      masterArray[i][:notes] = a
      i += 1
    end

    showsArray.size.times do |i|
      a = showsArray[i][/(cancelled\:)/, 1]
      if a == nil
        b = false
      else
        b = true
      end
      masterArray[i][:cancelled] = b
      i += 1
    end


    # masterArray.each do |i|
    #  p i[:venue]
    # end
    # p masterArray[-16]
    # p masterArray[-17]
    # p masterArray[-18]
    return masterArray
  end
end


end
