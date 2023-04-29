import { API_KEY,baseURL } from "../constant/env";
import axios from "axios";
import { dummyUser , dummyUserFollowing } from "../constant/mock";
import {parseUserDataIntoNodesEdges} from "./utils";
import {Toaster} from "../components/toaster/Toaster";
export const getInstagramUserIdByUsername = async (username) => {
    try {
        if (!username.trim().length > 0) {
            Toaster("error","Enter Username");
            return {};
        }
        // const userDetails = await axios.get(
		// 			`${baseURL}v1/user/by/username?username=` + username.trim(),
		// 			{
		// 				headers: {
		// 					"x-access-key": API_KEY,
		// 					"Content-Type": "application/json",
		// 					"Access-Control-Allow-Origin": "*",
		// 					"Access-Control-Allow-Headers": "GET, POST, OPTIONS",
		// 					"Access-Control-Expose-Headers":
		// 						"DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range",
		// 				},
		// 			},
		// 		);
        // return userDetails
        return dummyUser;
    } catch (error) {
       console.log(error);
       Toaster("error",error);
    }
};
export const getUserFollowingByUserId = async (user,totalFollowing=200) =>{
   try{
			// let isEnd_cursor=true;
			// let UserFollowing = [];
			// let URL = `${baseURL}/gql/user/following/chunk?user_id=${user?.pk}&amount=200&end_cursor=`;
			// if(totalFollowing <= 200 ){
			//     URL = `${baseURL}/v1/user/following/chunk?user_id=${user?.pk} `
			// }
			// let result = await callGetFollowingAPI(URL,user?.pk);
			// const {details} = result || {};
			// if(!details){
			//     while(isEnd_cursor){
			//         if(result[1].length > 5){
			//             UserFollowing.push(result[0]);
			//             URL = `${baseURL}/gql/user/following/chunk?user_id=${user?.pk}&amount=200&end_cursor=${result[1]}`;
			//             result =  await callGetFollowingAPI(URL,user?.pk);
			//         }else{
			//             UserFollowing.push(result[0]);
			//             isEnd_cursor= false;
			//         }
			//     }
            // UserFollowing =UserFollowing.filter((item) => item.is_private == false)
			// setUsersFollowing(UserFollowing);
			// return UserFollowing;

			// }else{
			//     return {};
			// }
			return dummyUserFollowing[0];
		}catch(e){
        console.log(e);
   }
}
const callGetFollowingAPI = async(URL,userId)=>{
	try {
		if (!userId.trim().length > 0) {
			return "Please enter Username";
		}
		const userFollowingDetails = await axios.get(URL, {
			headers: {
				"x-access-key": API_KEY,
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "GET, POST, OPTIONS",
				"Access-Control-Expose-Headers":
					"DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range",
			},
		});
		return userFollowingDetails;
		// return dummyUser;
	} catch (error) {
		console.log(error);
	}
}