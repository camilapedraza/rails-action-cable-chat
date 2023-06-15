class MessagesController < ApplicationController
  def create
    # content, chatroom, user
    @message = Message.new(message_params)
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message.chatroom = @chatroom
    @message.user = current_user
    @message.save
    ChatroomChannel.broadcast_to(
      @chatroom,
      render_to_string(partial: "message", locals: { message: @message })
      # partial that you want to render with local variables that need to be passed to it
    )
    redirect_to chatroom_path(@chatroom)
    head :ok # don't redirect to a view
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
