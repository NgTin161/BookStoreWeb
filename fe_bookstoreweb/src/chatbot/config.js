import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "BookBot",
  initialMessages: [createChatBotMessage("Xin chào! Tôi có thể giúp gì cho bạn?")],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#5a9",
    },
    chatButton: {
      backgroundColor: "#5a9",
    },
  },
  customComponents: {
    botAvatar: () => null, // Tắt avatar bot
  },
};

export default config;
