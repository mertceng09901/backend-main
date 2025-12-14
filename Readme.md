# 📍 MekanBul (Venue Finder) - Backend API

Bu proje, kullanıcıların çevrelerindeki mekanları (kafe, restoran vb.) keşfetmesini, detaylarını görüntülemesini, puanlamasını ve yorum yapmasını sağlayan tam kapsamlı bir RESTful API servisidir.

Proje, **Node.js** ve **Express** üzerinde kurgulanmış olup veritabanı olarak **MongoDB** (Mongoose) kullanmaktadır.

---

## 🚀 Canlı Demo (Live)

Proje Vercel üzerinde canlıya alınmıştır. API endpoint'lerine aşağıdaki linkten erişebilirsiniz:

🔗 **Base URL:** [https://backend-main-adqx.vercel.app](https://backend-main-adqx.vercel.app)

---

## 🛠 Kullanılan Teknolojiler

* **Runtime:** Node.js
* **Framework:** Express.js
* **Veritabanı:** MongoDB / Mongoose
* **API Test:** Postman

---

## 📸 API Endpoint Testleri ve Özellikler

Aşağıda API'nin temel fonksiyonlarının Postman üzerindeki test sonuçları ve ekran görüntüleri yer almaktadır.

### 1. Mekan İşlemleri (Venue Operations)
Mekan ekleme, listeleme, güncelleme ve silme işlemleri.

| İşlem | Açıklama | Ekran Görüntüsü |
| :--- | :--- | :--- |
| **Mekan Ekle** | Yeni bir mekan oluşturur. | ![Add Venue](test/Add%20Venue.png) |
| **Mekan Getir** | Tek bir mekanın detaylarını getirir. | ![Get Venue](test/Get%20Venue.png) |
| **Yakındaki Mekanlar** | Koordinata göre mekanları listeler. | ![List Nearby Venues](test/List%20Nearby%20Venues.png) |
| **Mekan Güncelle** | Mekan bilgilerini günceller. | ![Update Venue](test/Update%20Venue.png) |
| **Mekan Sil** | Mekanı sistemden kaldırır. | ![Delete Venue](test/Delete%20Venue.png) |

### 2. Yorum İşlemleri (Comment Operations)
Kullanıcıların mekanlara yaptığı yorumların yönetimi.

| İşlem | Açıklama | Ekran Görüntüsü |
| :--- | :--- | :--- |
| **Yorum Ekle** | Mekana yeni yorum ve puan ekler. | ![Add Comment](test/Add%20Comment.png) |
| **Yorum Getir** | Spesifik bir yorumu getirir. | ![Get Comment](test/Get%20Comment.png) |
| **Yorum Güncelle** | Yorum içeriğini veya puanı değiştirir. | ![Update Comment](test/Update%20Comment.png) |
| **Yorum Sil** | Yorumu veritabanından siler. | ![Delete Comment](test/Delete%20Comment.png) |

---

## ⚙️ Kurulum ve Çalıştırma (Localhost)

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu klonlayın:**
    ```bash
    git clone https://github.com/mertceng09901/backend-main.git
    cd backend-main
    ```

2.  **Bağımlılıkları yükleyin:**
    ```bash
    npm install
    ```

3.  **Projeyi başlatın:**
    ```bash
    npm start
    # veya nodemon kullanıyorsanız:
    nodemon
    ```
---

## 📂 Proje Yapısı

```text
backend-main/
├── app_api/
│   ├── models/       # Veritabanı şemaları (db.js, venue.js)
│   ├── routes/       # API rotaları (index.js)
│   └── controllers/  # İş mantığı (Venue ve Comment controller)
├── test/             # API test ekran görüntüleri
├── app.js            # Ana uygulama dosyası
└── Mert ACAR.postman_collection.json # Hazır Postman koleksiyonu