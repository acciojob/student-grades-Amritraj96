// Fetch the CSV file asynchronously
fetch("./students.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    // Split into rows and remove any empty trailing lines
    const lines = data.trim().split("\n");

    // Remove and store the header row (e.g., "name,marks")
    const headers = lines.shift().split(",");

    const students = lines.map(line => {
      const values = line.split(",");
      
      return {
        name: values[0],
        // Splits the pipe-delimited marks string into an array of numbers
        marks: values[1].split("|").map(Number)
      };
    });

    // Calculate and log average marks
    students.forEach(student => {
      const total = student.marks.reduce((sum, mark) => sum + mark, 0);
      const average = (total / student.marks.length).toFixed(2);

      console.log(`${student.name}: Average Marks = ${average}`);
    });
  })
  .catch(error => {
    console.error("Error fetching student data:", error);
  });