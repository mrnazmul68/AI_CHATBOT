import { app } from "./src/app.js";

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      process.stdout.write(`Server is running on port ${PORT}\n`);
    });
  } catch (error) {
    process.stderr.write("Server error", error);
    process.exit(1);
  }
};
startServer();
