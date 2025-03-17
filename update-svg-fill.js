const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "/assets/images/SwiftlistApp");
const targetColor = "#a9a0f0";
const newColor = "currentColor";

// Function to recursively update SVG files
const updateSVGFiles = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${dir}`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error reading file: ${filePath}`, err);
          return;
        }

        if (stats.isDirectory()) {
          // If it's a directory, recurse into it
          updateSVGFiles(filePath);
        } else if (stats.isFile() && file.endsWith(".svg")) {
          // Read the file and replace fill color
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              console.error(`Error reading SVG file: ${filePath}`, err);
              return;
            }

            // Replace fill="#a9a0f0" with fill="currentColor"
            const updatedData = data.replace(
              new RegExp(`fill=["']${targetColor}["']`, "g"),
              `fill="${newColor}"`
            );

            // Write the updated content back to the file
            fs.writeFile(filePath, updatedData, "utf8", (err) => {
              if (err) {
                console.error(`Error writing file: ${filePath}`, err);
                return;
              }
              console.log(`Updated: ${filePath}`);
            });
          });
        }
      });
    });
  });
};

// Start the script
updateSVGFiles(directoryPath);
