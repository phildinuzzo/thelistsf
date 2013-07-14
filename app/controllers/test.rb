def solution(s)
  if s.size == 1
  elsif s.size.odd?
      middle = s.size /2
      middle.times do |i|
      if s[i] == s[-i]
        return middle
      else
        return -1
      end
  end
end
