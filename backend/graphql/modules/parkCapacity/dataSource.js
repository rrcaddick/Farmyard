const puppeteer = require("puppeteer");

class ParkCapacity {
  async getCurrentCapacity() {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const [page] = await browser.pages();
    await page.goto("https://ikhokha.biz:8181/reporter/login");

    // Login
    await page.type(`input[name="username"]`, process.env.IKHOKHA_USER, { delay: 50 });
    await page.type(`input[name="password"]`, process.env.IKHOKHA_PASSWORD, { delay: 50 });

    await Promise.all([
      page.click(`input[name="submit"]`),
      page.waitForNavigation({ waitUntil: "networkidle2", timeout: false }),
    ]);

    const today = new Date()
      .toLocaleString("en-ZA", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replaceAll("/", "");

    await page.goto(`https://ikhokha.biz/reporter/app/myhistory/detailedhistory/${today}0000/${today}2355`);

    const data = await page.evaluate(() => {
      return JSON.parse(document.querySelector("body").innerText);
    });

    const totals = data.filter((sale) => {
      let isEntry = false;
      const { state, trxBasketItem } = sale;

      for (let { itemDescription } of trxBasketItem) {
        if (itemDescription.toLowerCase().includes("person")) {
          isEntry = true;
          break;
        }
      }

      return state === "Success" && isEntry;
    });

    return totals.reduce(
      (acc, sale) => {
        const { trxBasketItem, typedescr } = sale;

        const isCard = typedescr.toLowerCase().includes("card");
        const isCash = typedescr.toLowerCase().includes("cash");

        const { people, totalAmount } = trxBasketItem.reduce(
          (acc, { itemDescription, nrItems, totalAmount }) => {
            if (!itemDescription.toLowerCase().includes("person")) return acc;

            return { people: acc.people + nrItems, totalAmount: acc.totalAmount + totalAmount };
          },
          { people: 0, totalAmount: 0 }
        );

        return {
          people: acc.people + people,
          vehicles: acc.vehicles + 1,
          totalAmount: acc.totalAmount + totalAmount,
          totalCard: isCard ? acc.totalCard + totalAmount : acc.totalCard,
          totalCash: isCash ? acc.totalCash + totalAmount : acc.totalCash,
        };
      },
      { people: 0, vehicles: 0, totalAmount: 0, totalCard: 0, totalCash: 0 }
    );
  }
}

module.exports = ParkCapacity;
