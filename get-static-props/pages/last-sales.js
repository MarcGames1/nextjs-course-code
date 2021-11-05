import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage() 
{
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] =useState(false)

//   const { data, error } = useSWR(
//     'https://nextjs-course-9aba0-default-rtdb.firebaseio.com/sales.json'
//   );
//   useEffect(() => 
//   {
//        const transfomedSales = []
//           for (const key in data) {
//               transfomedSales.push({id:key,
//                    username:data[key].username,
//                     volume: data[key].volume
//                   })
//           }
//       setSales(transfomedSales);
//     }, [data]);

    useEffect(()=> {
        setIsLoading(true)
        fetch('https://nextjs-course-9aba0-default-rtdb.firebaseio.com/sales.json')
        .then(res=>res.json())
        .then(data=>{
            const transfomedSales = []
          for (const key in data) {
              transfomedSales.push({id:key,
                   username:data[key].username,
                    volume: data[key].volume
                  })
          }

            setSales(transfomedSales)
            setIsLoading(false)
        });
    }, [])


    //  if (error) {
    //    return <p>Failed to Load</p>;
    //  }

    //  if (!data) {
    //    return <p>no data</p>;
    //  }

  if (!sales) {
    return <p>no data Yet</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}
export default LastSalesPage;
