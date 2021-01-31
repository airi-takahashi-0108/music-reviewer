class UsersController < ApplicationController
  has_secure_password

  def new
  end

  def show
  end

  def index
    @users = User.all
    render json: @users
  end

  def destroy
  end
end
