# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'
Rails.application.config.assets.precompile += %w( reload.js )  #追記する
run Rails.application
