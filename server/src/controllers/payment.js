const axios = require("axios")

module.exports = {
    Add : async (req, res) => {
        const url = "https://developers.flouci.com/api/generate_payment";
        const payload = {
          app_token: "23a0dd8d-31c9-4619-ac9b-be9f04db044b",
          app_secret: process.env.FLOUCI_SECRET,
          amount: req.body.amount,
          accept_card: "true",
          session_timeout_secs: 1200,
          success_link: "http://localhost:3000/success",
          fail_link: "http://localhost:3000/cancel",
          developer_tracking_id: "5cefd569-f3af-4626-9294-7745373ab585",
        };
        try {
          const result = await axios.post(url, payload);
          res.send(result.data);
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      },

    Verify: async (req, res) =>{
        const payment_id = req.params.id;
        
        await axios.get(`https://developers.flouci.com/api/verify_payment/${payment_id}`,{
        
            headers: {
                'Content-Type': 'application/json',
                'apppublic': "c3af5d1a-25d6-4fa9-9bad-74e7301f40db",
                'appsecret': process.env.FLOUCI_SECRET
                }
            })
        .then((result) => {
            res.send(result.data);
        })
        .catch((err) =>{
            console.log(err.message);
        });
    }
    
};