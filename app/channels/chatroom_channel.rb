class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # stream_from "general" would stream from the general chatroom always
    chatroom = Chatroom.find(params[:id]) # params will come from javascript
    # stream_from "chatroom-#{chatroom.id}" long-hand for the below:
    stream_for chatroom
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
