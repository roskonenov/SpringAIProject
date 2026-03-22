package com.ai.spring_ai;

import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    private final OpenAiImageModel imageModel;

    public ImageService(OpenAiImageModel imageModel) {
        this.imageModel = imageModel;
    }

    public ImageResponse generateImage(String prompt, String quality, int n, int height, int width) {
       return imageModel.call(
                new ImagePrompt(
                        prompt,
                        OpenAiImageOptions
                                .builder()
                                .model("Lykon/DreamShaper")
                                .quality(quality)
                                .N(n)
                                .height(height)
                                .width(width)
                                .build()
                )
        );
    }
}
