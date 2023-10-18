    const express = require('express')
    const cors = require('cors')
    const app = express()
    require('dotenv').config()
    const port = process.env.PORT || 5000;

    app.use(cors())
    app.use(express.json())

    const brands = [
      {
        id: 1,
        brandName: "L'Oréal",
        brandImageURL: "https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/4YSYN5YYERGG5BCVG2OPA55TGQ.png",
        brandDescription: "L'Oréal is a world-renowned beauty and cosmetics brand with a rich history of innovation and quality products."
      },
      {
        id: 2,
        brandName: "Estée Lauder",
        brandImageURL: "https://image.slidesharecdn.com/17theesteelaudercompany-140822035536-phpapp01/85/the-estee-lauder-company-history-evolution-present-and-the-future-1-320.jpg?cb=1667537879",
        brandDescription: "Estée Lauder is a luxury skincare and cosmetics brand known for its commitment to beauty, science, and quality."
      },
      {
        id: 3,
        brandName: "Chanel",
        brandImageURL: "https://wallpapers.com/images/hd/chanel-logo-background-3xtmxatyvmxy3wv1.jpg",
        brandDescription: "Chanel is an iconic fashion and beauty brand, synonymous with elegance, sophistication, and timeless style."
      },
      {
        id: 4,
        brandName: "Dior",
        brandImageURL: "https://c8.alamy.com/comp/J652D4/dior-logo-malaysia-J652D4.jpg",
        brandDescription: "Dior is a leading fashion and beauty brand, renowned for its unmatched creativity, timeless luxury, and relentless innovation."
      },
      {
        id: 5,
        brandName: "Urban Decay",
        brandImageURL: "https://cdn.shopify.com/s/files/1/2298/5927/files/pretty_different.jpg",
        brandDescription: "Urban Decay is a bold and edgy cosmetics brand, known for its vibrant colors and cruelty-free products."
      },
      {
        id: 6,
        brandName: "Dove",
        brandImageURL: "https://static.startuptalky.com/2022/03/Dove-Marketing-Strategy-StartupTalky.jpg",
        brandDescription: "Dove is a multinational consumer goods company, committed to improving people's lives through its diverse product portfolio."
      }
    ];

    const products = [
      {
        id: 1,
        productName: "Product 1",
        brandName: "L'Oréal",
        price: 20.99,
        shortDescription: "This is a short description for Product 1.",
        rating: 4.5,
        imageURL: "https://example.com/product1-image"
      },
      {
        id: 2,
        productName: "Product 2",
        brandName: "Estée Lauder",
        price: 34.99,
        shortDescription: "This is a short description for Product 2.",
        rating: 4.2,
        imageURL: "https://example.com/product2-image"
      },
      {
        id: 3,
        productName: "Product 3",
        brandName: "Chanel",
        price: 45.99,
        shortDescription: "This is a short description for Product 3.",
        rating: 4.7,
        imageURL: "https://example.com/product3-image"
      },
      {
        id: 4,
        productName: "Product 4",
        brandName: "Dior",
        price: 55.99,
        shortDescription: "This is a short description for Product 4.",
        rating: 4.8,
        imageURL: "https://example.com/product4-image"
      },
      {
        id: 5,
        productName: "Product 5",
        brandName: "Urban Decay",
        price: 28.99,
        shortDescription: "This is a short description for Product 5.",
        rating: 4.4,
        imageURL: "https://example.com/product5-image"
      },
      {
        id: 6,
        productName: "Product 6",
        brandName: "Dove",
        price: 19.99,
        shortDescription: "This is a short description for Product 6.",
        rating: 4.0,
        imageURL: "https://example.com/product6-image"
      }
    ];

    const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eqvmyxo.mongodb.net/?retryWrites=true&w=majority`;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    const ProductCollection = client.db("Productsfile").collection("ProductsCollection")

    app.get('/products', async(req,res) => {
      const result = await ProductCollection.find().toArray()
      res.send(result)
    } )

    app.post('/products', async(req,res) => {
      const product = req.body;
      const result = await ProductCollection.insertOne(product);
      res.send(result)
    } )

    app.get('/products/:brandName', async (req, res) => {
      const brandName = req.params.brandName;
        const filteredProducts = await ProductCollection.find({ brandName: brandName }).toArray();
        res.send(filteredProducts);
  
    });
    


    app.get('/brands',(req,res) => {
      res.send(brands)
    })

    app.get('/', (req, res) => {
      res.send('Hello Developer')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })