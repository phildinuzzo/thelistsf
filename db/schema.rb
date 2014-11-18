# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20141118033313) do

  create_table "saved_shows", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "show_id"
    t.integer  "user_id"
  end

  create_table "shows", :force => true do |t|
    t.string   "date"
    t.text     "bands"
    t.string   "venue"
    t.string   "ages"
    t.string   "price"
    t.string   "time"
    t.boolean  "pit"
    t.boolean  "inout"
    t.boolean  "sellout"
    t.string   "rec"
    t.boolean  "soldout"
    t.string   "notes"
    t.boolean  "cancelled"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.datetime "sortdate"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
