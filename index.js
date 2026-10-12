const mineflayer = require('mineflayer');

// ---- بيانات سيرفرك في أترنوس ----
const RENDER_SERVER_HOST = 'your-server.aternos.me'; // حط هنا الـ IP بتاع سيرفرك
const RENDER_SERVER_PORT = 25565;                  // حط هنا بورت سيرفرك
const BOT_USERNAME = 'AFK_Bot';                    // اسم البوت جوه اللعبة

function createBot() {
    const bot = mineflayer.createBot({
        host: RENDER_SERVER_HOST,
        port: RENDER_SERVER_PORT,
        username: BOT_USERNAME,
        version: false
    });

    bot.on('spawn', () => {
        console.log('✅ البوت دخل السيرفر بنجاح!');
        
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            bot.look(bot.entity.yaw + 0.5, bot.entity.pitch, true);
        }, 30000);
    });

    bot.on('end', () => {
        console.log('⚠️ الاتصال اتفصل، جاري إعادة المحاولة...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', err => {
        console.log('❌ حصل خطأ:', err);
    });
}

createBot();

const http = require('http');
http.createServer((req, res) => {
    res.write("I'm alive!");
    res.end();
}).listen(process.env.PORT || 8080);
