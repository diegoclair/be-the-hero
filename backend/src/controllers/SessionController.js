const connectDB = require('../database/connection');

module.exports = {
  async create (req, res) {
    const {id} = req.body;

    const ong = await connectDB('tab_ongs')
      .where('id', id)
      .select('name')
      .first(); //if exists the ONG, then its go to return only one data, if we cannot put the first(), its return a array
    
    if (!ong){
      return res.status(400).json({error: 'No ONG found with this ID'})
    }

    return res.json(ong);
  }
}
