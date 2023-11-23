// // pages/api/user/[userId].js

// import { ObjectId } from 'mongodb';
// import { connectToDatabase } from '../../../lib/db';

// export default async function handler(req: { query: { userId: any; }; method: string; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
//   const { userId } = req.query;

//   if (req.method === 'PATCH') {
//     try {
//       const { db } = await connectToDatabase();

//       // Validate userId as a valid MongoDB ObjectId
//       if (!ObjectId.isValid(userId)) {
//         return res.status(400).json({ message: 'Invalid user ID' });
//       }

//       const objectId = new ObjectId(userId);

//       // Assuming you have a "users" collection
//       const result = await db.collection('users').updateOne(
//         { _id: objectId },
//         { $set: req.body } // Use $set to update only the fields provided in the request body
//       );

//       if (result.modifiedCount === 1) {
//         res.status(200).json({ message: 'User updated successfully' });
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
