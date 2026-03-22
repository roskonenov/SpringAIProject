package com.ai.spring_ai;

import org.jspecify.annotations.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class GenAIController {

    private final ChatService chatService;
    private final ImageService imageService;

    public GenAIController(ChatService chatService, ImageService imageService) {
        this.chatService = chatService;
        this.imageService = imageService;
    }

    @GetMapping("/ask-ai")
    public String getResponse(@RequestParam String prompt) {
        return chatService.getResponse(prompt);
    }

    @GetMapping("/ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt) {
        return chatService.getResponseOptions(prompt);
    }

    @GetMapping("/generate-image")
    public List<String> getResponseOptions(@RequestParam String prompt,
                                                     @RequestParam(defaultValue = "hd") String quality,
                                                     @RequestParam(defaultValue = "1") int n,
                                                     @RequestParam(defaultValue = "1024") int height,
                                                     @RequestParam(defaultValue = "1024") int width) throws IOException {
        return imageService.generateImage(prompt, quality, n, height, width)
                .getResults()
                .stream()
                .map(result -> result.getOutput().getUrl())
                .toList();
    }
}
