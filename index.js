const express = require("express");
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer");
const port = process.env.PORT || 3000;

app.use(cors());
app.get("/api", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.alura.com.br/formacao-front-end");

  const pageData = await page.evaluate(() => {
    return {
      title: document.querySelector(".formacao-headline-titulo").innerText,
      subtitle: document.querySelector(".formacao-headline-subtitulo")
        .innerHTML,
    };
  });

  await browser.close();

  res.send({
    id: 33082,
    title: pageData.title,
    subtitle: pageData.subtitle,
  });
});

// const document = SwaggerModule.createDocument(app, config);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});