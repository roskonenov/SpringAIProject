package com.ai.spring_ai;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    private final ChatModel chatModel;

    public ChatService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String getResponse(String prompt) {
        return chatModel.call(prompt);
    }

    public String getResponseOptions(String prompt) {
        ChatResponse data = chatModel.call(
                new Prompt(
                        prompt,
                        OpenAiChatOptions
                                .builder()
                                .model("ServiceNow-AI/Apriel-1.6-15b-Thinker")
                                .temperature(0.4)
                                .build()
                )
        );
        return data.getResult() == null
                ? "Your request cannot be processed at this time. Please try again later."
                : data.getResult().getOutput().getText();
    }
}
