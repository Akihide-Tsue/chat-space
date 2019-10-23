class MessagesController < ApplicationController
def index
  @posts = Post.all
end
