class CreateMusics < ActiveRecord::Migration[6.1]
  def change
    create_table :musics do |t|
      t.references :disc, null: false, foreign_key: true
      t.string :title
      t.string :comment

      t.timestamps
    end
  end
end
