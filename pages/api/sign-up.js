import { connectDB, getCollection } from '../../helpers/db-util';

async function handler(req, res){
  if(req.method === 'POST'){
    const email = req.body.email;

    if(!email.includes('@')){
      res.status(422).json({message: 'Invalid email address!'});
      return;
    }

    let client;

    try{
      client = await connectDB(); 
    }catch(error){
      res.status(500).json({message: 'Cound not connect to database!'});
      return;
    }
 
    try{
      const collection = getCollection(client, 'newsletter');
      await collection.insertOne({email: email});
      res.status(201).json({message: 'Email address registered successfully!'});
    }catch(error){
      res.status(500).json({message: 'Email registration failed!'});
    }

    client.close();

  }
}

export default handler;