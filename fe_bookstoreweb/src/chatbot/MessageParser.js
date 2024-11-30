class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("xin chào")) {
        // this.actionProvider.greet();
      }
    }
  }
  
  export default MessageParser;
  