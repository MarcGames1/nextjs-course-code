import {MongoClient} from 'mongodb'


async function handler(req, res) {
    if(req.method ==="POST"){
        const userEmail = req.body.email
        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message:'Invalid Email Address.'})
            return
        }

       const client = await MongoClient.connect(
         'mongodb+srv://master:rweEfjVnQTFJL0nY@cluster0.ius6q.mongodb.net/events?retryWrites=true&w=majority'
       );
            
                const db = client.db()
                await db.collection('newsletter').insertOne({
                    email:userEmail
                })
            
        
            client.close()
            res.status(201).json({message:'Signed Up!'})
    }
}

export default handler