import { app } from "./src/app.js";

const startServer = async () => {
  try {
    
    const server = app.listen(3000, () => {
      process.stdout.write("Server is running on port 3000");
    });
  } catch (error) {
    process.stderr.write("Server error", error);
    process.exit(1);
  }
};
startServer();
