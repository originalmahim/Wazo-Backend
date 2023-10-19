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
    const CartCollection = client.db("Cartfile").collection("CartCollection")

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

    app.get('/products/:brandName/:id', async (req, res) => {
      const brandName = req.params.brandName;
      const id = req.params.id;
      const query = {_id: new ObjectId(id),brandName: brandName,};
      const result = await ProductCollection.findOne(query);
      res.send(result || 'Product not found');
    });
    
    app.post('/cart', async(req,res) => {
      const cart = req.body;
      const result = await CartCollection.insertOne(cart);
      res.send(result)
    })

    app.get('/cart', async(req,res) => {
      const result = await CartCollection.find().toArray()
      res.send(result)
    })
    


    app.get('/brands',(req,res) => {
      res.send(brands)
    })

    app.get('/', (req, res) => {
      res.send('Hello Developer')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })