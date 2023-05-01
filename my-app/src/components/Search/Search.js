import { React, Fragment, useState } from "react";
import {
	getInstagramUserIdByUsername,
	getUserFollowingByUserId,
} from "../../actions/APIActions";
import classes from "./search.module.css";
import Button from 'react-bootstrap/Button';
import {Toaster} from "../toaster/Toaster";
import { parseUserDataIntoNodesEdges } from "../../actions/utils";
const SearchInput = (props) => {
    
    const { setGraphData, setUsersFollowing, setSearchInput, searchInput, setIsLoading } = props;
    const onClickSearchHandler = async() => {
			setIsLoading(true);
			const userData = await getInstagramUserIdByUsername(searchInput);
			if (typeof userData == "object" && Object.keys(userData).length) {
				if (userData.is_private) {
					Toaster("error", "Enter User having public profile");
					setIsLoading(false);
					return;
				}
				const followingData = await getUserFollowingByUserId(
					userData,
					userData?.following_count,
				);
				setUsersFollowing(followingData);
				const { nodes, edges } = parseUserDataIntoNodesEdges(
					userData,
					followingData,
				) || { nodes: {}, edges: {} };
				if (nodes.length && edges.length) {
					setGraphData({ nodes: nodes, edges: edges });
				}
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		}
    const onChangeInputHandler = (e)=>{
        setSearchInput(e.target.value);
    }

    return (
			<div className="d-flex px-5 pt-3 gap-3">
				<div className={classes.filter_searchCont}>
					<input
						type="text"
						placeholder="Search"
						onChange={(e) => onChangeInputHandler(e)}
						className={`${classes.filter_searchCont_input} textDullViolet`}
						value={searchInput}
					></input>
				</div>
				<Button variant="outline-primary"  size="sm" onClick={onClickSearchHandler}>Search</Button>
			</div>
		);

    


}
export default SearchInput;