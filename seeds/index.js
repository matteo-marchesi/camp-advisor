const mongoose = require('mongoose');

const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/camp-advisor');
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    console.log('Emptying collection...');
    await Campground.deleteMany({});
    console.log('Seeding database...');
    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66d5bc17ac7212de4c305c3f',
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfjdnimlc/image/upload/v1727368604/camp-advisor/dztsndm4r8cbzayotyro.jpg',
                    filename: 'dztsndm4r8cbzayotyro',
                },
                {
                    url: 'https://res.cloudinary.com/dfjdnimlc/image/upload/v1727368604/camp-advisor/avyzdatfxf7dfcahymuq.jpg',
                    filename: 'avyzdatfxf7dfcahymuq',
                },
                {
                    url: 'https://res.cloudinary.com/dfjdnimlc/image/upload/v1727368604/camp-advisor/dwrqoivhrfy61mlvomtu.jpg',
                    filename: 'dwrqoivhrfy61mlvomtu',
                },
                {
                    url: 'https://res.cloudinary.com/dfjdnimlc/image/upload/v1727368604/camp-advisor/ypb0bczgzvrwuevkd3e9.jpg',
                    filename: 'ypb0bczgzvrwuevkd3e9',
                },
                {
                    url: 'https://res.cloudinary.com/dfjdnimlc/image/upload/v1727368604/camp-advisor/p8c1qksp1mesiscriuis.jpg',
                    filename: 'p8c1qksp1mesiscriuis',
                }
            ],
            price: price,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad alias cumque cupiditate, dignissimos ducimus enim est facere inventore ipsam itaque magnam maxime nemo, porro possimus quae qui quis voluptatum!',
            location: `${cities[random1000].city}, ${cities[random1000].state}`
        });
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close()
            .then(() => {
                console.log('Connection closed.');
            });
    });