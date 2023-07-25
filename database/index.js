const sequelize = require('./database');
var bodyParser = require('body-parser');
const cors = require('cors');
const { User, Magazine, Subscription } = require('./models');
const express = require('express');
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 6600,
  path: '/batch',
  method: 'GET'
};

const app = express();
app.use(cors());
const port = process.env.PORT || 80;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced!');
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/create_user', async (req, res) => {
  let data = req.body;
  console.log(data)

  sequelize.sync().then(() => {
    User.create({
      username: data.username,
      email: data.email,
      password: data.password
    }).then(resp=> {
        res.status(200).send("user created")
    }).catch((error) => {
      console.log(error)
      res.status(500).send(`Failed to create a new record: ${JSON.stringify(error)}`);
    });
  })
});

app.post('/create_magazine', (req, res) => {
  let data = req.body;
  console.log(data)

  sequelize.sync().then(() => {
    Magazine.create({
      name: data.name,
      publisher: data.publisher
    }).then(resp=> {
        res.status(200).send("magazine created")
    }).catch((error) => {
      console.log(error)
      res.status(500).send(`Failed to create a new record: ${JSON.stringify(error)}`);
    });
  })
});

app.post('/create_subscription', (req, res) => {
  let data = req.body;
  console.log(data)
    
  User.findOne({ where: { username: data.username } })
  .then((user) => {
    if (!user) {
      throw new Error('User not found');
    }

    // Find the magazine based on the magazine name
    Magazine.findOne({ where: { name: data.magazineName } })
      .then((magazine) => {
        if (!magazine) {
          throw new Error('Magazine not found');
        }

        // Create the subscription
        Subscription.create({
          startDate: data.startDate,
          endDate: data.endDate,
          UserId: user.id,
          MagazineId: magazine.id,
        })
          .then(() => {
            res.status(200).send('Subscription created');
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .send(`Failed to create a new record: ${JSON.stringify(error)}`);
          });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .send(`Failed to find the magazine: ${JSON.stringify(error)}`);
      });
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send(`Failed to find the user: ${JSON.stringify(error)}`);
  });
  
});

app.get('/subscriptions', (req, res) => {
  console.log("subscription")
  Subscription.findAll({
    attributes: ['startDate', 'endDate'],
    include: [
      {
        model: User,
        attributes: ['username', 'email'],
      },
      {
        model: Magazine,
        attributes: ['name', 'publisher'],
      },
    ],
  }).then(subscriptions => {
    res.status(200).send(subscriptions)
  }).catch(error => {
    console.error(error);
    res.status(500).send(JSON.stringify(error))
  });
})

 app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 