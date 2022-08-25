import fs from 'fs';
import path from 'path';

export function buildPath(){
  return path.join(process.cwd(), 'data', 'comments.json');
}

export function extractData(filePath){
  const data = fs.readFileSync(filePath);
  return JSON.parse(data)
}

function handler(req, res){
  const eventId = req.query.eventId;

  if(req.method === 'GET'){
    const filePath = buildPath();
    const data = extractData(filePath);
    const event = data.find(event => event.id === eventId); 

    res.status(200).json({ comments: event ? event.comments : [] });

  }else if(req.method === 'POST'){
    const filePath = buildPath();
    const data = extractData(filePath);
    const { name, email, text} = req.body;
    const idx = data.findIndex( event => event.id === eventId);
    let event = data[idx];
    if(!event){
      event = {
        id: eventId,
        comments: [{id: new Date().toISOString(), name, email, text}]
      };
      data.push(event);
    }else{
      event.comments.push({id: new Date().toISOString(), name, email, text});
      data[idx] = event;
    }
    fs.writeFileSync(filePath, JSON.stringify(data));
    
    res.status(201).json({ comments: event.comments})
  }

}

export default handler;