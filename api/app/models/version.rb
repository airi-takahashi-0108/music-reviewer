class Version < ApplicationRecord
  # mount_uploader :audio, AudioUploader
  belongs_to :music
  has_one :disc, through: :music
end
