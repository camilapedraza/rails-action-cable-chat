import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable" // import function from library

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static targets = ["messages"]
  static values = {
    chatroomId: Number
  }

  // connect methods run on page load, or when the associated dom element begins to exist
  connect() {
    console.log(`Connecting to the ActionCable channel with id ${this.chatroomIdValue}`)
    // used in the connect method because you want to start listening as soon as you load/connect
    // this creates an instance of the consumer class and then a subscription for it
    // the param for the subscription is the same as the app/channels chanel I created
    this.channel = createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      { received: (data) => { this.#insertMessage(data) } }
    ) // use function imported from library
    // the subscription will start transmitting/broadcasting on page load and stream from the channel indicated in  chatroom_channel.rb
  }

  // when the user leaves the page the stimulus controller is technically disconnected
  // but this method stops the user listening to the channel (unsubscribes them from the broadcast)
  // disconnect methods run whenever the user leaves the page or the dom element disappears
  disconnect() {
    console.log("Disconnecting from the ActionCable channel")
    // this stops the actioncable subscription:
    this.channel.unsubscribe // opposite of subscriptions.create
  }

  // this resets the target of the event (which is the form itself)
  resetForm(event) {
    event.target.reset()
  }

  //private method indicated with a hashtag
  #insertMessage(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight) // first param: x, second param: Y — this will scroll to the bottom
  }
}
