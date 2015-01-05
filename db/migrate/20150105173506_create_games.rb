class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :game_id
      t.integer :num_players
      t.integer :player_1_score
      t.integer :player_2_score
      t.integer :player_3_score
      t.integer :player_4_score
      t.integer :player_5_score
      t.integer :player_6_score
    end
  end
end
