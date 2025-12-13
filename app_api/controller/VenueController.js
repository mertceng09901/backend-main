var mongoose = require('mongoose');
var Venue = mongoose.model("venue");

const createResponse = function (res, status, content) {
    res.status(status).json(content);
}

var converter = (function () {
    var earthRadius = 6371; // km
    var radian2Kilometer = function (radian) {
        return parseFloat(radian * earthRadius);
    };
    var kilometer2Radian = function (distance) {
        return parseFloat(distance / earthRadius);
    };
    return {
        radian2Kilometer, kilometer2Radian,
    }
})();

const listVenues = function (req, res) {
    var lat = parseFloat(req.query.lat) || 0;
    var long = parseFloat(req.query.long) || 0;
    var point = { type: "Point", coordinates: [lat, long] };
    var geoOptions = {
        distanceField: "distance", spherical: true,
        maxDistance: converter.radian2Kilometer(100)
    };
    try {
        Venue.aggregate([
            {
                $geoNear: {
                    near: point, ...geoOptions,
                }
            }]).then((result) => {
                const venues = result.map(function (venue) {
                    return {
                        distance: converter.kilometer2Radian(venue.distance),
                        name: venue.name,
                        address: venue.address,
                        rating: venue.rating,
                        foodanddrink: venue.foodanddrink,
                        id: venue._id,
                    };
                });
                if (venues.length > 0)
                    createResponse(res, "200", venues);
                else
                    createResponse(res, "200", { "status": "Civarda mekan yok" });
            })
    } catch (error) {
        createResponse(res, "404", error);
    }
};

/*const addVenue = async function (req, res) {
    //createResponse(res, 200, { status: "başarılı" });

    try {
        await Venue.create({
            ...req.body,
            coordinates:[req.body.lat,req.body.long],
            hours:[{
                days:req.body.days1,
                open: req.body.open1,
                close: req.body.close1,
                isClosed: req.body.isClosed1
            },
            {
                days:req.body.days2,
                open: req.body.open2, 
                close: req.body.close2,
                isClosed: req.body.isClosed2
            }]
        })//.then(function (venue) {
            createResponse(res, 201, venue);
        //});
    } catch (error) {
        createResponse(res, "404", error);
    }
}*/
const addVenue = async function (req, res) {
    try {
        // ADIM 1: İstek geldi mi?
        console.log("--> 1. addVenue isteği sunucuya ulaştı.");
        console.log("--> 2. Gelen Veri:", JSON.stringify(req.body));

        // ADIM 2: Veritabanı işlemi başlıyor
        // coordinates dizisini ve hours dizisini doğru formatladığımızdan emin oluyoruz
        const newVenue = await Venue.create({
            name: req.body.name,
            address: req.body.address,
            foodanddrink: req.body.foodanddrink,
            rating: req.body.rating,
            coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)], // Sayıya çeviriyoruz
            hours: [
                {
                    days: req.body.days1,
                    open: req.body.open1,
                    close: req.body.close1,
                    isClosed: req.body.isClosed1
                },
                {
                    days: req.body.days2,
                    open: req.body.open2,
                    close: req.body.close2,
                    isClosed: req.body.isClosed2
                }
            ]
        });

        // ADIM 3: Veritabanı kaydı bitti
        console.log("--> 3. Mekan veritabanına kaydedildi. ID:", newVenue._id);

        // ADIM 4: Cevap dönülüyor
        createResponse(res, 201, newVenue);
        console.log("--> 4. Başarılı cevap gönderildi.");

    } catch (error) {
        // HATA YAKALAMA
        console.error("!!! HATA OLUŞTU !!!");
        console.error("Hata Mesajı:", error.message);
        
        // Hatayı Postman'e de dönelim ki neyin yanlış olduğunu gör
        createResponse(res, 400, { "status": "Hata oluştu", "mesaj": error.message });
    }
}

const getVenue = async function (req, res) {
    try {
        await Venue.findById(req.params.venueid).exec().then(function (venue) {
            createResponse(res, 200, venue);
        });

    }
    catch (err) {
        createResponse(res, 404, { status: "böyle bir mekan yok" });
    }
    //createResponse(res,200,{status:"getvenue başarılı"});
}

const updateVenue = async function (req, res) {
   // createResponse(res, 200, { status: "update başarılı" });
    try {
        const updateVenue= await Venue.findByIdAndUpdate(req.params.venueid, {
            ...req.body,
            coordinates:[req.body.lat,req.body.long],
            hours:[{
                days:req.body.days1,
                open: req.body.open1,
                close: req.body.close1,
                isClosed: req.body.isClosed1
            },
            {
                days:req.body.days2,
                open: req.body.open2, 
                close: req.body.close2,
                isClosed: req.body.isClosed2
            }]
        }, { new: true });
        createResponse(res, 200, updateVenue);
    } catch (error) {
        createResponse(res, "404", error);
    }   
}

const deleteVenue = function (req, res) {
    createResponse(res, 200, { status: "başarılı" });
}

module.exports = {
    listVenues,
    addVenue,
    getVenue,
    updateVenue,
    deleteVenue
}