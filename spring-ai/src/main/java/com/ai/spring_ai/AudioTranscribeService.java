package com.ai.spring_ai;

import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.OpenAiAudioTranscriptionOptions;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class AudioTranscribeService {

    private final OpenAiAudioTranscriptionModel transcriptionModel;

    public AudioTranscribeService(
            @Value("${spring.ai.openai.base-url}") String baseUrl,
            @Value("${spring.ai.openai.api-key}") String audioApi) {
        OpenAiAudioApi openAiAudioApi = OpenAiAudioApi
                .builder()
                .baseUrl(baseUrl)
                .apiKey(audioApi)
                .build();
        transcriptionModel = new OpenAiAudioTranscriptionModel(openAiAudioApi);
    }


    public String transcribeAudio(MultipartFile file) throws IOException {
        File tempFile = File.createTempFile("audio", ".wav");
        file.transferTo(tempFile);

        OpenAiAudioTranscriptionOptions options = OpenAiAudioTranscriptionOptions.builder()
                .model("openai/whisper-large-v3")
                .temperature(0f)
                .responseFormat(OpenAiAudioApi.TranscriptResponseFormat.TEXT)
                .build();

        FileSystemResource resource = new FileSystemResource(tempFile);
        return transcriptionModel.call(new AudioTranscriptionPrompt(resource, options))
                .getResult()
                .getOutput();
    }
}
