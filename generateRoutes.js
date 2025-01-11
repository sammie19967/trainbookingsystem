const destinations = [
    "Bungoma",
    "Kakamega",
    "Kisumu",
    "Eldoret",
    "Nakuru",
    "Nairobi",
    "Mtito Andei",
    "Mombasa",
    "Kilifi",
    "Lamu"
  ];
  
  // Function to generate all route combinations
  const generateRoutes = (destinations, trainType) => {
    const routes = [];
    for (let i = 0; i < destinations.length; i++) {
      for (let j = 0; j < destinations.length; j++) {
        if (i !== j) {
          routes.push({
            train_type: trainType,
            from_location: destinations[i],
            to_location: destinations[j],
          });
        }
      }
    }
    return routes;
  };
  
  // Generate routes for the Intercounty train
  const intercountyRoutes = generateRoutes(destinations, "Intercounty");
  
  // SQL Insert statements for Routes table
  const generateInsertSQL = (routes) => {
    return routes
      .map(
        (route) =>
          `INSERT INTO Routes (train_type, from_location, to_location) VALUES ('${route.train_type}', '${route.from_location}', '${route.to_location}');`
      )
      .join("\n");
  };
  
  // Generate SQL
  const sqlStatements = generateInsertSQL(intercountyRoutes);
  
  // Output the SQL to a file or console
  const fs = require("fs");
  fs.writeFileSync("insert_routes.sql", sqlStatements);
  
  console.log("SQL file 'insert_routes.sql' has been generated.");
  