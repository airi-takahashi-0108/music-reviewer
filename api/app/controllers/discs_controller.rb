class DiscsController < ApplicationController
  before_action :set_disc, only: [:show, :update, :destroy]

  # GET /discs
  def index
    @discs = Disc.all
    render json: @discs
  end

  # GET /discs/1
  def show
    render json: @disc
  end

  # POST /discs
  def create
    @disc = Disc.new(disc_params)

    if @disc.save
      render json: @disc, status: :created, location: @disc
    else
      render json: @disc.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /discs/1
  def update
    if @disc.update(disc_params)
      render json: @disc
    else
      render json: @disc.errors, status: :unprocessable_entity
    end
  end

  # DELETE /discs/1
  def destroy
    @disc.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_disc
    @disc = Disc.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def disc_params
    params.fetch(:disc, {})
  end

  def disc_params
    params.require(:disc).permit(:title, :description, :id)
  end
end
