import {Channel, Video} from '../types';
import { getEntry, getEntryByUrl } from "../contentstack-sdk/entry"; // Adjust to the correct path



// export interface Video {
//     id: string;
//     title: string;
//     description: string;
//     thumbnailUrl: string;
//     videoUrl: string;
//     views: number;
//     likes: number;
//     uploadDate: string;
//     channel: Channel;
//   }
  
//   export interface Channel {
//     id: string;
//     name: string;
//     avatarUrl: string;
//     subscribers: number;
//     videos: Video[];
//   }

export const fetchMockVideos = async() : Promise<Video[]> =>{
    try{
        var videoEntries: any = await getEntry({
            contentTypeUid: "video_clip",
            referenceFieldPath: ["channel"],
            jsonRtePath: ["video_description"],
          });
        
        videoEntries = videoEntries[0];
        // console.log(videoEntries);
        const videos : Video[] = await Promise.all(
            videoEntries.map(
                async (entry :any) =>{
                    var channelEntry : any = await getEntryByUrl({
                        contentTypeUid: "techtube_channel",
                        entryUrl: "/channel/"+entry.channel[0]?.uid,
                        referenceFieldPath: ["videos"],
                        jsonRtePath: [],
                    });
                    channelEntry = channelEntry[0];
                    // console.log(channelEntry);
                    const channel: Channel = {
                        id: channelEntry.uid,
                        name: channelEntry.title,
                        avatarUrl: channelEntry.avatar_image?.url || "",
                        subscribers: channelEntry.subscribers || 0,
                        videos: [], // Skip videos here to avoid circular dependency
                      };
                    return {
                        id : entry.uid,
                        title : entry.title,
                        description :entry.video_description,
                        thumbnailUrl : entry.thumbnail?.url || "",
                        videoUrl : entry.video_clip?.url|| "",
                        views: entry.views || 0,
                        likes: entry.likes || 0,
                        uploadDate: entry.upload_date,
                        channel : channel
                    }
                }
            )
        )

        return videos;
    }
    catch(error){
        console.error(error)
        return [];
    }
}



export const fetchMockChannels = async () :Promise<Channel[]> =>{
    try{
        var channelEntries : any  = await getEntry({
            contentTypeUid: "techtube_channel",
            referenceFieldPath: ["videos"], // Include video references
            jsonRtePath: [],
        });
        channelEntries = channelEntries[0];
        // console.log(channelEntries);
        const channels : Channel[] = await Promise.all(
            channelEntries.map(async(entry:any) =>{
                // console.log(entry)
                const videos : Video[] = await Promise.all(
                    (entry.videos || []).map(async (video : any)=>{
                        
                    })
                )
                
                return {
                    id: entry.uid,
                    name: entry.title,
                    avatarUrl: entry.avatar_image.url,
                    subscribers: entry.subscribers,
                    videos: []
                }
            })
        )
        return channels;

    }
    catch(error){
        console.error(error);
        return [];
    }
}


export const mockVideos : Promise<Video[]> = fetchMockVideos();
export const mockChannels : Promise<Channel[]> =  fetchMockChannels();
