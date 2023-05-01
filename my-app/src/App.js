import './App.css';
import Loader from './components/Loader';
import SearchInput from "./components/Search/Search";
import SocialMap from './components/SocialMap';
// import {edges, nodes} from './constant/data';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  // const[userId , setUserId] = useState(0);
  const[usersFollowing , setUsersFollowing] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const[GraphData, setGraphData] = useState({
    nodes:[],
    edges:[]
  });
  const [isLoading , setIsLoading] = useState(false);

  return (
		<div className="App">
			<SearchInput
				setGraphData={setGraphData}
				setUsersFollowing={setUsersFollowing}
				setSearchInput={setSearchInput}
				searchInput={searchInput}
				setIsLoading={setIsLoading}
			/>
			{!isLoading && (
				<SocialMap
					edges={GraphData.edges}
					nodes={GraphData.nodes}
					usersFollowing={usersFollowing}
					setUsersFollowing={setUsersFollowing}
					setGraphData={setGraphData}
					setSearchInput={setSearchInput}
					setIsLoading={setIsLoading}
					isLoading={isLoading}
				/>
			)}
			{isLoading && <Loader isLoading={isLoading} />}
			<ToastContainer />
		</div>
	);
}

export default App;
