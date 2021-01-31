class CreateVersions < ActiveRecord::Migration[6.1]
  def change
    create_table :versions do |t|
      t.references :music, null: false, foreign_key: true
      t.string :version
      t.string :comment
      t.string :src

      t.timestamps
    end
  end
end
