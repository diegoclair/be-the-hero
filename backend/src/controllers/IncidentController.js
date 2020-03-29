const connectDB = require('../database/connection');

module.exports = {

  async index(req, res) {

    const {page = 1} = req.query;
    const incidents = await connectDB('tab_incidents')
      .join('tab_ongs', 'tab_ongs.id', '=', 'tab_incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'tab_incidents.*',
        'tab_ongs.name',
        'tab_ongs.email',
        'tab_ongs.whatsapp',
        'tab_ongs.city',
        'tab_ongs.uf'
      ]);

    const [count] = await connectDB('tab_incidents').count(); //return a array, and we get only the value with [count] - example of return { 'count(*)': 7 }

    console.log(count);
    
    res.header('X-Total-Count', count['count(*)']);
    return res.json(incidents);
  },

  async create(req,res) {

    let {title, description, value} = req.body
    const ong_id = req.headers.authorization;

    value = value.replace(',', '.');
    console.log(value);
    

    const result = await connectDB('tab_incidents').insert({
      title,
      description,
      value,
      ong_id,
    });
    
    const id = result[0]

    return res.json({id})

  },

  async delete(req,res){   

    const {id} = req.params;
    const ong_id = req.headers.authorization;    

    const incident = await connectDB('tab_incidents')
      .where('id', id)
      .select('ong_id')
      .first();
    
      if (incident.ong_id != ong_id){
        return res.status(401).json({
          error: 'Operation not permited for this Ong ID'
        })
      }

      await connectDB('tab_incidents').where('id', id).delete();
      
      return res.status(204).send();
    

  }

}