class Disc < ApplicationRecord
  has_many :musics, dependent: :destroy
  has_many :versions, through: :musics
end
