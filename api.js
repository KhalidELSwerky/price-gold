// ✅ كود JavaScript جاهز لجلب سعر الذهب بالأوقية والجرام (عيار 24)

// مفتاحك من GoldAPI.io
const GOLD_API_KEY = "goldapi-a2wgr19mgvqo6kl-io";

// دالة لجلب السعر وتحويله
async function getGoldPrice() {
  try {
    // ⿡ جلب سعر أوقية الذهب مقابل الدولار
    const goldRes = await fetch("https://www.goldapi.io/api/XAU/USD", {
      headers: { "x-access-token": GOLD_API_KEY },
    });
    const goldData = await goldRes.json();

    if (!goldData.price) throw new Error("لم يتم العثور على سعر الذهب من الـ API");

    const ouncePriceUSD = goldData.price; // سعر الأوقية بالدولار

    // ⿢ جلب سعر صرف الدولار مقابل الجنيه المصري
    const exchangeRes = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=EGP");
    const exchangeData = await exchangeRes.json();
    const usdToEgp = exchangeData.rates?.EGP;

    if (!usdToEgp) throw new Error("لم يتم الحصول على سعر الدولار مقابل الجنيه");

    // ⿣ التحويل من الأوقية إلى الجرام (1 أوقية = 31.1035 جرام)
    const gramPriceUSD = ouncePriceUSD / 31.1035;
    const gramPriceEGP = gramPriceUSD * usdToEgp;

    // ⿤ عرض النتائج
    console.log("💰 سعر الذهب الآن:");
    console.log(`سعر الأوقية: ${ouncePriceUSD.toFixed(2)} دولار` );
    console.log(`سعر الجرام: ${gramPriceUSD.toFixed(2)} دولار`);
    console.log(`  سعر الجرام بالجنيه المصري: ${gramPriceEGP.toFixed(2)} جنيه`);

    // أو ترجعه كـ Object
    return {
      ouncePriceUSD,
      gramPriceUSD: Number(gramPriceUSD.toFixed(2)),
      gramPriceEGP: Number(gramPriceEGP.toFixed(2)),
    };

  } catch (err) {
    console.error("❌ خطأ:", err.message);
  }
}

// تشغيل الدالة
getGoldPrice();
