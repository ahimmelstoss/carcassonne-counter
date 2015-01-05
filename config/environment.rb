ENV['SINATRA_ENV'] ||= "development"

require 'bundler/setup'
Bundler.require

db = URI.parse(ENV['DATABASE_URL'] || 'postgres:///localhost/mydb')

ActiveRecord::Base.establish_connection(
 :adapter  => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
 :host     => db.host,
 :username => db.user,
 :password => db.password,
 :database => db.path[1..-1],
 :encoding => 'utf8'
)

require_all 'models'
require './app.rb'