# require 'gon'

class ShowsController < ApplicationController

  # GET /shows
  # GET /shows.json
  def index
    #   a = Show.date
    #   Date.parse(a).strftime('%a, %b %d')

    # @shows = Show.find(:all, :order => "created_at")
    @shows = Show.all
    # sorted = @records.sort_by &:created_at
    # @shows_unordered = Show.all
    # @shows = []
    gon.shows = Show.all

    # @shows_unordered.each do |i|
    #   if i.date == nil
    #   else
    #     a = i.date
    #     Date.parse(a).strftime('%a, %b %d')
    #     @shows << i
    #   end
    # end


    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @shows }
    end
  end

  def archive
    @shows = Show.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @shows }
    end
  end


  def raw
    @shows = Show.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @shows }
    end
  end

  def search

  end

  def saved

    @saved_shows = SavedShow.where(:user_id => current_user.id)
    @savedshows = []
    @saved_shows.each do |i|
      @savedshows << i.show_id
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @shows }
    end
  end

  def shows_url
    respond_to do |format|
      format.html { redirect_to shows_url }
      format.json { head :no_content }
    end

  end

  def save_show
    @user_id = params[:user_id]
    @show_id = params[:show_id]
    if SavedShow.where(:show_id => @show_id, :user_id => @user_id).exists?
      SavedShow.where(:show_id => @show_id, :user_id => @user_id).delete_all
    else
      SavedShow.create(:show_id => @show_id, :user_id => @user_id)
    end
    respond_to do |format|
      format.html { redirect_to shows_url }
      format.json { head :no_content }
    end
  end

  # GET /shows/1
  # GET /shows/1.json
  def show
    @show = Show.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @show }
    end
  end

  # GET /shows/new
  # GET /shows/new.json
  def new
    @show = Show.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @show }
    end
  end

  # GET /shows/1/edit
  def edit
    @show = Show.find(params[:id])
  end

  # POST /shows
  # POST /shows.json
  def create
    @show = Show.new(params[:show])

    respond_to do |format|
      if @show.save
        format.html { redirect_to @show, notice: 'Show was successfully created.' }
        format.json { render json: @show, status: :created, location: @show }
      else
        format.html { render action: "new" }
        format.json { render json: @show.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /shows/1
  # PUT /shows/1.json
  def update
    @show = Show.find(params[:id])

    respond_to do |format|
      if @show.update_attributes(params[:show])
        format.html { redirect_to @show, notice: 'Show was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @show.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /shows/1
  # DELETE /shows/1.json
  def destroy
    @show = Show.find(params[:id])
    @show.destroy

    respond_to do |format|
      format.html { redirect_to shows_url }
      format.json { head :no_content }
    end
  end

end
