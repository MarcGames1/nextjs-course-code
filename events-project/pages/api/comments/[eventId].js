async function handler (req, res) {
    const eventId = req.query.eventId

   const client = await MongoClient.connect(
     'mongodb+srv://master:rweEfjVnQTFJL0nY@cluster0.ius6q.mongodb.net/events?retryWrites=true&w=majority'
   );
        
      
    if(req.method === "POST") {
        // add server side validation
        const {email, name, text} = req.body
        
        if(!email.includes('@') || !name ||name.trim() ==="" || !text || text.trim()===""){
            res.status((422).json({message:"invalid Input"}))
            return
        } else {

            const newComment = {
                email,
                name,
                text,
                eventId
            }

           const db= client.db
             const result = await db.collection('comments').insertOne(newComment);
             console.log(result)
            res.status(201).json({mesage:"Added Comment", Comment:newComment})
        }
    }

    if(req.method === "GET") {
        const dummyList = [
            {id:'c1', name:"Max", text: "A first comment!"},
            {id:"c2", name:"Manuel", text:"A second comment!"}
        ]

        res.status(200).json({comments:dummyList})
    }
    client.close()
}

export default handler