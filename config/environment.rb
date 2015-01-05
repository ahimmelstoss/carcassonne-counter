ENV['SINATRA_ENV'] ||= "development"

require 'bundler/setup'
Bundler.require

ActiveRecord::Base.establish_connection(
  :adapter => "sqlite3",
  :database => "db/carcassonne_#{ENV['SINATRA_ENV']}.sqlite"
)

require_all 'models'
require './app.rb'