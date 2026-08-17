import { chatService } from "./service.js";
export const chat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const aiResponse = await chatService(prompt);

    return res.status(200).json({
      AI: aiResponse,
    });
  } catch (error) {
    console.error("Chat error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
