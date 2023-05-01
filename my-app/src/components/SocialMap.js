import React from 'react'
import Graph from "react-graph-vis";
import {parseUserDataIntoNodesEdges} from "../actions/utils";
import { getUserFollowingByUserId } from "../actions/APIActions";
import "../../node_modules/vis-network/dist/dist/vis-network.min.css";

const SocialMap = (props) => {
    const {
			nodes,
			edges,
			usersFollowing,
			setUsersFollowing,
			setGraphData,
			setSearchInput,
            setIsLoading
		} = props;
    const GraphData = {nodes: nodes, edges: edges};

    let options = {
			// layout: {
			//     hierarchical: true
			//   },
            shapeProperties: {
                interpolation: false    // 'true' for intensive zooming
              },
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
				// solver:"repulsion" ,
				// repulsion: {
				// 	nodeDistance: 250, // Put more distance between the nodes.
				// },
                // stabilization: {
                //     enabled: true,
                //     iterations: 5000    // YMMV
                //   }
                barnesHut: {
                    gravitationalConstant: -50000, // This is the default * 25.
                    nodeDistance: 250
                  },
                  stabilization: {
                    enabled: false // This is here just to see what's going on from the very beginning.
                  }
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
				hideEdgesOnDrag: true,
				hideEdgesOnZoom: true,
				dragNodes: true,
			},
			height: "900px",
		};
    const events = {
        select: async function(event) {
					const { nodes } = event;
					console.log(nodes[0]);
					// alert("User Clicked: " + nodes[0]);
					const userData = usersFollowing.filter(
						(item) => item.pk.toString() === nodes[0].toString(),
					);
                    setSearchInput("");
                    setIsLoading(true);
					const followingData = await getUserFollowingByUserId(
						userData[0],
						userData[0]?.following_count,
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
                    setIsLoading(false);
				},
                // stabilized: (network) => {
                //     if (network) { // Network will be set using getNetwork event from the Graph component
                //         // network.setOptions({ physics: false }); // Disable physics after stabilization
                //         network.fit();
                //     }
                // }
      };

   
  return (
		<div className="container">
			<Graph
				graph={GraphData}
				options={options}
				events={events}
				// getNetwork={(network) => {
				// 	setNetwork(network);
				// }}
			/>
		</div>
	);
}
export default SocialMap;