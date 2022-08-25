import { connectDB, getCollection, getDocuments} from '../../../helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try{
    client = await connectDB();
  }catch(error){
    res.status(500).json({message: 'Couldn\'t connect to database!'});
    return;
  }
 
  if (req.method === "GET") {
    
    try{
      const collection = getCollection(client, 'comments');
      const documents = await getDocuments(collection, { _id: -1}, { eventId: eventId})
      res.status(200).json({ comments: documents });
    }catch(error){
      res.status(500).json({message: "Could\'t get comments!"})
    }
  }

  if (req.method === "POST") {
    
    const { name, email, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({message: 'Invalid comment!'});
      client.close();
      return;
    }

    const newComment = {name, email, text, eventId};
    let collection;
    try{
      collection = getCollection(client, 'comments');
      await collection.insertOne(newComment);
    }catch(error){
      res.status(500).json({message: 'Your comment failed!'});
      client.close();
      return;
    }

    try{
      const documents = await getDocuments(collection, { _id: -1}, { eventId: eventId});
      res.status(201).json({ comments: documents });
    }catch(error){
      res.status(500).json({message: "Could\'t get comments!"}) 
    }

  }

  client.close();
}





export default handler;
