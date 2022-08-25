function handler(req, res){
  if(req.method === 'POST'){
    const email = req.body.email;

    if(!email.includes('@')){
      res.status(422).json({message: 'Invalid email address!'});
      return;
    }

    fetch('https://nextjs-course-98db4-default-rtdb.firebaseio.com/creadentialS.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:email})
    })
    .then(response => response.json())
    .then(data => {
      res.status(201).json({message: 'Successfully registered!'})

    });

  }
}

export default handler;