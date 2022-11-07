const puppeteer = require("puppeteer");

class ParkCapacity {
  async getCurrentCapacity(date) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
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

    const queryDate = new Date(date)
      .toLocaleString("en-ZA", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replaceAll("/", "");

    await page.goto(`https://ikhokha.biz/reporter/app/myhistory/detailedhistory/${queryDate}0000/${queryDate}2355`);

    const data = await page.evaluate(() => {
      return JSON.parse(document.querySelector("body").innerText);
    });

    await browser.close();

    const totals = data.filter((sale) => {
      let isEntry = false;
      const { state, trxBasketItem } = sale;

      for (let { itemDescription } of trxBasketItem) {
        if (itemDescription.toLowerCase().includes("person") || itemDescription.toLowerCase().includes("discount")) {
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

        const { people, group, totalAmount } = trxBasketItem.reduce(
          (acc, { itemDescription, nrItems, totalAmount }) => {
            if (
              !(itemDescription.toLowerCase().includes("person") || itemDescription.toLowerCase().includes("discount"))
            )
              return acc;
            const isPublic = itemDescription.toLowerCase().includes("person");
            const isGroup = itemDescription.toLowerCase().includes("discount");

            return {
              people: isPublic ? acc.people + nrItems : acc.people,
              group: isGroup ? acc.group + nrItems : acc.group,
              totalAmount: acc.totalAmount + totalAmount,
            };
          },
          { people: 0, group: 0, totalAmount: 0 }
        );

        return {
          people: acc.people + people,
          vehicles: acc.vehicles + 1,
          group: acc.group + group,
          totalAmount: acc.totalAmount + totalAmount,
          totalCard: isCard ? acc.totalCard + totalAmount : acc.totalCard,
          totalCash: isCash ? acc.totalCash + totalAmount : acc.totalCash,
        };
      },
      { people: 0, vehicles: 0, group: 0, totalAmount: 0, totalCard: 0, totalCash: 0 }
    );
  }
}

module.exports = ParkCapacity;
