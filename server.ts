import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI server-side lazily to prevent startup crashes when API keys are not yet configured.
let aiClient: GoogleGenAI | null = null;

function getGoogleGenAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured on the server. Please add it to your secrets in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// JSON request body parser
app.use(express.json());

// API route for AI assistant chat
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format. Expected an array." });
    }

    // Map client messages to Gemini content format with role mapping
    const ai = getGoogleGenAI();

    const contents = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content || "" }]
    }));

    const systemInstruction = `Вы являетесь ИИ-ассистентом для бренда минималистичной уличной одежды "Suraya Brand" из г. Бишкек (Кыргызстан). Ваша задача — дружелюбно, вежливо и профессионально помогать клиентам с выбором одежды, рассказывать о материалах (высококачественный 100% хлопок класса Пенье, плотная трехнитка с начесом), размерах (S, M, L, XL, XXL), условиях доставки и оплаты, а также о местонахождении шоурума.

Наш каталог товаров:
1. Черная Футболка Oversize (1200 сом) — плотная 220 г/м², 95% хлопок пенье, 5% эластан, цвета: глубокий черный, графит.
2. Свитшот Minimalist Серый (2400 сом) — 340 г/м², трехнитка футер с начесом, цвета: меланж серый, черный.
3. Футболка Молочный Oversize (1200 сом) — 200 г/м², 95% хлопок, 5% спандекс, цвета: молочный белый, бежевый песок.
4. Свитшот Sage Green (2600 сом) (оригинальная цена 2900 сом, сейчас скидка!) — 350 г/м², 100% органический хлопок футер трехнитка, цвета: шалфейный зеленый, земляно-серый.
5. Футболка Terracotta Dust (1100 сом) — 210 г/м², 98% органический трикотаж, 2% лайкра, цвета: песочная терракота, глубокий шоколад.

Особенности наших изделий:
- Собственный цех по пошиву в Бишкеке (работаем более 5 лет).
- Плотный хлопковый трикотаж класса Пенье (самый дорогой и качественный вид обработки хлопка: гладкий, мягкий, не кашлатится).
- Вся одежда шьется по собственным оригинальным лекалам с двойным контролем качества шва.

Контакты и шоурум:
- Адрес шоурума: Кыргызстан, г. Бишкек, ул. Киевская, 125.
- Как ориентироваться: Находимся ровно посередине квартала, вход с торца здания, ориентир — черная минималистичная вывеска "Suraya" (через дорогу от ТЦ "Караван").
- Время работы: ежедневно с 10:00 до 20:00 без перерывов и выходных.
- Телефон/WhatsApp: +996 700 123 456 (наши специалисты на связи практически круглосуточно).

Доставка и Оплата:
- Доставка по Бишкеку: Курьером до вашей двери. Стоимость 150 сом. При заказе товаров на сумму от 2000 сом — доставка БЕСПЛАТНАЯ! Срок доставки быстрый — всего 2-3 часа.
- Доставка по Кыргызстану и СНГ: Курьерскими службами или почтой по тарифам транспортных компаний.
- Способы оплаты: Наличными при получении, перевод на карту (Mbank, Элкарт, О!Деньги), или онлайн-оплата картой через терминал в шоуруме.

Возврат и обмен:
- В шоуруме можно примерить одежду. Обмен или возврат возможен в течение 14 дней при условии сохранения товарного вида и фабричных бирок.

Стиль общения: лаконичный, дружелюбный, модный и современный. Пишите вежливо, не льстите излишне, общайтесь как стильный консультант в современном брендовом бутике уличной моды. Отвечайте строго на русском языке, используйте форматирование маркдауном (списки, жирный шрифт) для выделения цен и ключевых характеристик.`;

    // Make the backend generative content call
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Извините, не удалось сформировать ответ. Пожалуйста, попробуйте еще раз.";
    res.json({ reply });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "Произошла ошибка при обращении к ИИ-ассистенту. Пожалуйста, попробуйте позже.", 
      details: error.message 
    });
  }
});

// Vite Middleware development server or static dist folder serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in development mode with Vite HMR middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in production mode serving static dist files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Suraya Server] Running smoothly on port ${PORT}`);
  });
}

startServer();
