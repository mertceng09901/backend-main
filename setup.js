var mongoose = require('mongoose');

// DİKKAT: Buraya MongoDB Atlas'tan aldığınız bağlantı linkini yapıştırın!
// Şifrenizi (<password> kısmını silip) yazmayı unutmayın.
var dbURI = 'mongodb+srv://MertAcar56:l2311Mert@cluster0.7kol0ty.mongodb.net/mekanbul?retryWrites=true&w=majority'; 

// Model şemasını tanıtmamız lazım (Model dosyanızın yolunu kontrol edin)
// Genelde: './app_api/models/venue' veya './models/venue' olur.
// Eğer dosya yolunu bulamazsanız hata verir, o satırı düzeltmeniz gerekir.
require('./app_api/models/venue'); 

var Venue = mongoose.model('venue');

const venues = [
    {
        "name": "Mado",
        "address": "Iyaş Park AVM Girişi, Isparta",
        "rating": 3,
        "foodanddrink": ["Dondurma", "Baklava", "Çay"],
        "coords": [37.7855, 30.5585],
        "openingTimes": [
            { "days": "Pzt-Paz", "opening": "09:00", "closing": "23:00", "closed": false }
        ]
    },
    {
        "name": "Starbucks",
        "address": "Centrum Garden AVM, Isparta",
        "rating": 4,
        "foodanddrink": ["Kahve", "Kek", "Sandviç"],
        "coords": [37.7900, 30.5600],
        "openingTimes": [
            { "days": "Pzt-Paz", "opening": "08:00", "closing": "23:00", "closed": false }
        ]
    }
];

mongoose.connect(dbURI)
    .then(async () => {
        console.log("Bulut veritabanına bağlanıldı...");
        
        // 1. Önce temizle (İsteğe bağlı, temiz kurulum için iyidir)
        await Venue.deleteMany({});
        console.log("Eski veriler temizlendi.");

        // 2. Verileri ekle
        await Venue.insertMany(venues);
        console.log("✅ Mekanlar başarıyla Atlas'a yüklendi!");

        // 3. Çıkış yap
        process.exit();
    })
    .catch((err) => {
        console.log("❌ Hata oluştu:", err);
        process.exit();
    });