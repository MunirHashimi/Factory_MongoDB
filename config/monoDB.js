const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Munir:Munir@cluster0.pqnfyya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("mongoDB connection error :", err)
  });