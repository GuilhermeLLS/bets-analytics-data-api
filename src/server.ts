import express from 'express'
import '@controllers/index'
import sheetsRouter from "@routes/index"

const app = express()

app.use("/sheetsdata", sheetsRouter)

app.get('/', (_, response) => {
  return response.json({ message: "There is nothing on this route. Try /sheetsdata instead" })
})

app.listen(5000, () => console.log("Server is listening on port 5000"))
