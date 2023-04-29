import './App.css';
import SearchInput from "./components/Search/Search";
import SocialMap from './components/SocialMap';
// import {edges, nodes} from './constant/data';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  // const[userId , setUserId] = useState(0);
  const[usersFollowing , setUsersFollowing] = useState([]);
  const[GraphData, setGraphData] = useState({
    nodes:[],
    edges:[]
  });

  return (
		<div className="App">
			<SearchInput
				setGraphData={setGraphData}
				setUsersFollowing={setUsersFollowing}
			/>
			<SocialMap
				edges={GraphData.edges}
				nodes={GraphData.nodes}
				usersFollowing={usersFollowing}
				setUsersFollowing={setUsersFollowing}
        setGraphData={setGraphData}
			/>
			<ToastContainer />
		</div>
	);
}

export default App;
