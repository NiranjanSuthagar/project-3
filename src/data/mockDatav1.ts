// import { Channel, Video } from '../types';
// import { getEntry, getEntryByUrl } from "../contentstack-sdk/entry"; // Adjust to the correct path


// // Mock data setup
// export const fetchMockVideos = async (): Promise<Video[]> => {
//   try {
//     // Fetch all video entries
//     const videoEntries: any = await getEntry({
//       contentTypeUid: "video_clip",
//       referenceFieldPath: ["channel"],
//       jsonRtePath: ["video_description"],
//     });
//     // console.log(videoEntries);
//     // Transform the fetched data into Video[] type
//     const videos: Video[] = await Promise.all(
//       videoEntries[0].map(async (entry: any) => {
//         // Fetch the channel details for each video
//         const channelDetails: any = await getEntryByUrl({
//           contentTypeUid: "techtube_channel",
//           entryUrl: "/channel/"+entry.channel[0]?.uid,
//           referenceFieldPath: [],
//           jsonRtePath: [],
//         });

//         console.log(channelDetails);
//         // Parse the channel details into the Channel type
//         const channel: Channel = {
//           id: channelDetails.uid,
//           name: channelDetails.title,
//           avatarUrl: channelDetails.avatar_image?.url || "",
//           subscribers: channelDetails.subscribers || 0,
//           videos: [], // Skip videos here to avoid circular dependency
//         };
//         // console.log(channel);
//         // Parse the video entry into the Video type
//         return {
//           id: entry.uid,
//           title: entry.title,
//           description: entry.video_description,
//           thumbnailUrl: entry.thumbnail?.url || "",
//           videoUrl: entry.video_clip?.url || "",
//           views: entry.views || 0,
//           likes: entry.likes || 0,
//           uploadDate: entry.upload_date,
//           channel,
//         };
//       })
//     );

//     return videos;
//   } catch (error) {
//     console.error("Error fetching mock videos:", error);
//     return [];
//   }
// };


// export const fetchMockChannels = async (): Promise<Channel[]> => {
//   try {
//     // Fetch all channel entries
//     const channelEntries: any = await getEntry({
//       contentTypeUid: "techtube_channel",
//       referenceFieldPath: ["videos"], // Include video references
//       jsonRtePath: [],
//     });

//     // console.log(channelEntries); //working checked

//     // Transform the fetched data into Channel[] type
//     const channels: Channel[] = await Promise.all(
//       channelEntries[0].map(async (entry: any) => {
//         // Fetch video details for each channel's videos
//         const videos: Video[] = await Promise.all(
//           (entry.videos || []).map(async (videoRef: any) => {
//             // console.log(videoRef);
//             // console.log("/channel/"+videoRef.uid);
//             const videoDetails: any = await getEntryByUrl({ //
//               contentTypeUid: videoRef._content_type_uid,
//               entryUrl: videoRef.uid,
//               referenceFieldPath: ["channel"],
//               jsonRtePath: ["video_description"],
//             });
//             // console.log("details" + videoDetails);//
//             // const videoDetails = videoRef;
//             return {
//               id: videoDetails.uid,
//               title: videoDetails.title,
//               description: videoDetails.video_description,
//               thumbnailUrl: videoDetails.thumbnail?.url || "",
//               videoUrl: videoDetails.video_clip?.url || "",
//               views: videoDetails.views || 0,
//               likes: videoDetails.likes || 0,
//               uploadDate: videoDetails.upload_date,
//               channel: null, // Avoid circular reference for now
//             };
//           })
//         );
//         // console.log(entry);
//         // Parse the channel entry into the Channel type
//         return {
//           id: entry.uid,
//           name: entry.title,
//           avatarUrl: entry.avatar_image?.url || "",
//           subscribers: entry.subscribers || 0,
//           videos,
//         };
//       })
//     );

//     return channels;
//   } catch (error) {
//     console.log("Error fetching mock channels:", error);
//     return [];
//   }
// };

// // Export mock channels for use in your app
// // fetchMockChannels().then((channels) => {
// //   export const mockChannels: Channel[] = channels;
// // });
// export const mockVideos : Video[] = await fetchMockVideos();
// export const mockChannels : Channel[] = await fetchMockChannels();
// // console.log(mockChannels);
// // Export mock videos for use in your app
// // fetchMockVideos().then((videos) => {
// //   export const mockVideos: Video[] = videos;
// // });



// // export const mockChannels: Channel[] = [
// //   {
// //     id: '1',
// //     name: 'Tech Insights',
// //     avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
// //     subscribers: 1200000,
// //     videos: [],
// //   },
// //   {
// //     id: '2',
// //     name: 'Code Masters',
// //     avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
// //     subscribers: 800000,
// //     videos: [],
// //   },
// //   {
// //     id: '3',
// //     name: 'Future Tech',
// //     avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
// //     subscribers: 2000000,
// //     videos: [],
// //   },
// //   {
// //     id: '4',
// //     name: 'AI Revolution',
// //     avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop',
// //     subscribers: 1500000,
// //     videos: [],
// //   },
// //   {
// //     id: '5',
// //     name: 'Cyber Security Pro',
// //     avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
// //     subscribers: 900000,
// //     videos: [],
// //   }
// // ];

// // export const mockVideos: Video[] = [
// //   {
// //     id: '1',
// //     title: 'Building AI-Powered Applications',
// //     description: 'Learn how to integrate artificial intelligence into your applications using the latest technologies and frameworks.',
// //     thumbnailUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop',
// //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
// //     views: 150000,
// //     likes: 12000,
// //     uploadDate: '2024-03-10',
// //     channel: mockChannels[0],
// //   },
// //   {
// //     id: '2',
// //     title: 'The Future of Quantum Computing',
// //     description: 'Exploring the potential of quantum computing and its impact on technology',
// //     thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
// //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
// //     views: 300000,
// //     likes: 25000,
// //     uploadDate: '2024-03-09',
// //     channel: mockChannels[1],
// //   },
// //   {
// //     id: '3',
// //     title: 'Cybersecurity Best Practices 2024',
// //     description: 'Essential security measures for protecting your digital assets',
// //     thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
// //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
// //     views: 200000,
// //     likes: 18000,
// //     uploadDate: '2024-03-08',
// //     channel: mockChannels[2],
// //   },
// //   {
// //     id: '4',
// //     title: 'Web3 Development Tutorial',
// //     description: 'Complete guide to building decentralized applications',
// //     thumbnailUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
// //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
// //     views: 180000,
// //     likes: 15000,
// //     uploadDate: '2024-03-07',
// //     channel: mockChannels[3],
// //   },
// //   {
// //     id: '5',
// //     title: 'Machine Learning Fundamentals',
// //     description: 'Getting started with machine learning and neural networks',
// //     thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop',
// //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
// //     views: 250000,
// //     likes: 20000,
// //     uploadDate: '2024-03-06',
// //     channel: mockChannels[4],
// //   },
// //   {
// //     id: '6',
// //     title: 'Cloud Architecture Patterns',
// //     description: 'Best practices for designing scalable cloud solutions',
// //     thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
// //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
// //     views: 120000,
// //     likes: 9000,
// //     uploadDate: '2024-03-05',
// //     channel: mockChannels[0],
// //   },
// //   {
// //     id: '7',
// //     title: 'DevOps Pipeline Automation',
// //     description: 'Streamline your development workflow with CI/CD',
// //     thumbnailUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop',
// //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
// //     views: 180000,
// //     likes: 14000,
// //     uploadDate: '2024-03-04',
// //     channel: mockChannels[1],
// //   },
// //   {
// //     id: '8',
// //     title: '5G Technology Explained',
// //     description: 'Understanding the next generation of mobile networks',
// //     thumbnailUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop',
// //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
// //     views: 220000,
// //     likes: 17000,
// //     uploadDate: '2024-03-03',
// //     channel: mockChannels[2],
// //   },
// //   {
// //     id: '9',
// //     title: 'Blockchain Development',
// //     description: 'Building secure and scalable blockchain applications',
// //     thumbnailUrl: 'https://images.unsplash.com/photo-1644143379190-08a5f055de1d?w=600&h=400&fit=crop',
// //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
// //     views: 190000,
// //     likes: 16000,
// //     uploadDate: '2024-03-02',
// //     channel: mockChannels[3],
// //   }
// // ];
// import React from 'react'
// import '../styles/Report.css'
// import axios from 'axios'
// const Report = () => {
//     const handleSubmit = (e: any) => {
//         e.preventDefault();
//         var name = e.target.name?.value;
//         var email = e.target.mail?.value;
//         var query = e.target.query?.value;
//         // console.log(name, email, query);
//         axios.post('https://app.contentstack.com/automations-api/run/15a4152cf31e449296f89fc9fa781368', {
//             "entry": {
//                 "title": name+email,
//                 "form": {
//                     "name": name,
//                     "email": email,
//                     "fraud_issue": query
//                 }
//             }
//         }).then(res => {
//             console.log(res);
//             console.log(res.status)
//         }).catch(err => {
//             console.log(err);
//         })
//     }
//   return (
//     // <div>
//     //     <h1>Report Fraud</h1>
//     //     <form method="post">
//     //         <input type="text" placeholder='Enter your Name' required min="3" max='50'/>
//     //         <input type="email" name="mail" id="mail" required placeholder='Enter your e-mail' />
//     //         <input type="text-area"  placeholder='Fraud issues' required/>
//     //         <button type='submit'><h3>Post</h3></button>
//     //     </form>
//     // </div>
//     <div className="fraud-report-container" id='report'>
//     <h1 className="fraud-report-title">Report Fraud</h1>
//     <form action="" method="get" className="fraud-report-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Enter your Name"
//         id='name'
//         required
//         minLength="3"
//         maxLength="50"
//         className="form-input"
//         name='name'
//       />
//       <input
//         type="email"
//         name="mail"
//         id="mail"
//         required
//         placeholder="Enter your e-mail"
//         className="form-input"
//       />
//       <textarea
//         placeholder="Fraud issues"
//         required
//         id='query'
//         className="form-textarea"
//         name='query'
//       ></textarea>
//       <button type="submit" className="form-submit-button">
//         <h3 className="submit-button-text">Post</h3>
//       </button>
//     </form>
//   </div>
//   )
// }
// export default Report