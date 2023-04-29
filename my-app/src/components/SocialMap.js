import React from 'react'
import Graph from "react-graph-vis";
import {parseUserDataIntoNodesEdges} from "../actions/utils";
import { getUserFollowingByUserId } from "../actions/APIActions";
import "../../node_modules/vis-network/dist/dist/vis-network.min.css";

const SocialMap = (props) => {
    const { nodes, edges, usersFollowing, setUsersFollowing,setGraphData } = props;
    const GraphData = {nodes: nodes, edges: edges};

    let options = {
			// layout: {
			//     hierarchical: true
			//   },
			autoResize: true,
			nodes: {
				shape: "dot",
				scaling: {
					min: 10,
					max: 20,
					label: {
						min: 10,
						max: 10,
						// drawThreshold: 12,
						// maxVisible: 100,
					},
				},
				font: {
					size: 12,
					face: "Tahoma",
				},
			},
			edges: {
				length: 300,
				width: 0.5,
				smooth: {
					type: "continuous",
				},
				color: { inherit: "to" },
			},
			// physics: true,
			physics: {
				// Even though it's disabled the options still apply to network.stabilize().
				enabled: true,
				solver: "repulsion",
				repulsion: {
					nodeDistance: 300, // Put more distance between the nodes.
				},
			},
			// tooltipStyle: {
			// 	content: {
			// 		background: "rgba(255, 255, 255, 0.7)",
			// 		padding: "10px",
			// 		borderRadius: "10px",
			// 	},
			// 	line: {
			// 		borderLeft: "1px dotted rgba(0, 0, 0, 0.5)",
			// 	},
			// 	dot: {
			// 		border: "5px solid rgba(0, 0, 0, 0.5)",
			// 	},
			// },
			interaction: {
				hover: true,
				navigationButtons: false,
				tooltipDelay: 100,
				hideEdgesOnDrag: false,
				hideEdgesOnZoom: false,
				dragNodes: true,
			},
			height: "900px",
		};
    const events = {
        select: async function(event) {
					const { nodes } = event;
					console.log(nodes[0]);
					alert("User Clicked: " + nodes[0]);
					const userData = usersFollowing.filter(
						(item) => item.pk.toString() === nodes[0].toString(),
					);
					const followingData = await getUserFollowingByUserId(
						userData,
						userData?.following_count,
					);
					setUsersFollowing(followingData);
					const { nodes: nodesData, edges: edgesData } =
						parseUserDataIntoNodesEdges(userData[0], followingData) || {
							nodesData: {},
							edgesData: {},
						};
					if (nodesData.length && edgesData.length) {
						setGraphData({ nodes: nodesData, edges: edgesData });
					}
				}
      };

   
  return (
    <div className='container'>
        <Graph
            graph = {GraphData}
            options={options}
            events={events}
        />
    </div>
  )
}
export default SocialMap;