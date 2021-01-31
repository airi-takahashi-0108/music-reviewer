class Music < ApplicationRecord
  belongs_to :disc
  has_many :versions, dependent: :destroy
end
