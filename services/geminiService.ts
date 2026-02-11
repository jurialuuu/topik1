
import { GoogleGenAI, Modality } from "@google/genai";

// Strictly adhering to API key provided in environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTutorResponse = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are a professional Korean language tutor specialized in TOPIK I (Levels 1 and 2). Your goal is to explain grammar, translate phrases, and provide practice examples in a friendly, encouraging way. Use simple English and include Korean text with Romanization and translations. Keep explanations concise but thorough.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later!";
  }
};

export const generateTTS = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Read clearly: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};

/**
 * Utility to play raw PCM data returned by the Gemini TTS API
 */
export const playPCM = async (base64Data: string, onEnded?: () => void) => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    
    const dataInt16 = new Int16Array(bytes.buffer);
    const buffer = audioCtx.createBuffer(1, dataInt16.length, 24000); // 24kHz is default for this model
    const channelData = buffer.getChannelData(0);
    
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    if (onEnded) source.onended = onEnded;
    source.start();
    return true;
  } catch (err) {
    console.error("Audio Playback Error:", err);
    return false;
  }
};
