package com.ai.spring_ai;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {

    private final ChatModel chatModel;

    public RecipeService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String generateRecipe(String ingredients, String cuisine, String dietaryRestrictions) {
        String template = """
                I want to create a recipe using the following ingredients: %s.
                The cuisine type i prefer is %s.
                Consider the following dietary restrictions: %s.
                Provide me with detailed recipe including title, list of ingredients and cooking instructions.
                """;
        PromptTemplate promptTemplate = new PromptTemplate(String.format(template, ingredients, cuisine, dietaryRestrictions));
        ChatResponse response = chatModel.call(promptTemplate.create());

        return response.getResult() == null
                ? "This service is unavailable right now! Try again later."
                : response.getResult().getOutput().getText();
    }
}