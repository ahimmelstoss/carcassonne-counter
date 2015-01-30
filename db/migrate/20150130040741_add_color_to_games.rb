class AddColorToGames < ActiveRecord::Migration
  def change
    add_column :games, :player_1_color, :string
    add_column :games, :player_2_color, :string
    add_column :games, :player_3_color, :string
    add_column :games, :player_4_color, :string
    add_column :games, :player_5_color, :string
    add_column :games, :player_6_color, :string
  end
end
