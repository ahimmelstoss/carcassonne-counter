require_relative './config/environment.rb'

class App < Sinatra::Base
  get '/' do 
    send_file 'public/index.html'
  end

  get '/games' do 
  end

  post '/save_game' do
    @game = Game.find_or_create_by(game_id: params[:game_id])
    @game.update(
      num_players: params[:num_players].to_i,
      player_1_score: params[:player_1_score].to_i,
      player_2_score: params[:player_2_score].to_i,
      player_3_score: params[:player_3_score].to_i,
      player_4_score: params[:player_4_score].to_i,
      player_5_score: params[:player_5_score].to_i,
      player_6_score: params[:player_6_score].to_i
    )
  end
end