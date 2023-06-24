const { MongoClient } = require("mongodb");

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://dhanushbdev:04nGb5DgHr0S7uLd@ippopayassignment.uw8djng.mongodb.net/?retryWrites=true&w=majority";

  /**
   * The Mongo Client you will use to interact with your database
   * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
   * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
   * pass option { useUnifiedTopology: true } to the MongoClient constructor.
   * const client =  new MongoClient(uri, {useUnifiedTopology: true})
   */
  const client = new MongoClient(uri);

  // For backend and express
  const express = require("express");
  const app = express();
  const cors = require("cors");
  console.log("App listen at port 4000");
  app.use(express.json());
  app.use(cors());

  app.get("/", (req, resp) => {
    resp.send("App is Working");
    // You can check backend is working or not by
    // entering http://loacalhost:4000

    // If you see App is working means
    // backend working properly
  });

  app.post("/register", async (req, resp) => {
    try {
      // Connect to the MongoDB cluster
      await client.connect();
      createListing(client, req.body);
      resp.send("Data added successfully");
      console.log(req.body);
      // Make the appropriate DB calls
    } catch (e) {
      resp.send("Something Went Wrong");
    } finally {
      // Close the connection to the MongoDB cluster
      setTimeout(() => {
        client.close();
      }, 1500);
    }
  });
  app.listen(4000);
}

main().catch(console.error);
//custom function to add the data to mongodb connection
async function createListing(client, newListing) {
  const result = await client
    .db("ippo_pay_assignment")
    .collection("sampledata")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}
