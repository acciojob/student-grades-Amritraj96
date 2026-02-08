//your JS code here. If required.
// Fetch the CSV file asynchronously
fetch("./students.json")
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split("\n");

    // Remove header row
    const headers = lines.shift().split(",");

    const students = lines.map(line => {
      const values = line.split(",");
      return {
        name: values[0],
        marks: values[1]
          .split("|")
          .map(Number)
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
