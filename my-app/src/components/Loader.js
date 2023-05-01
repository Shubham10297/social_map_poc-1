import loader from "../assets/Pulse-1s-200px.svg";

const Loader = (props) =>{
 let { isLoading } = props;

    return isLoading ? (
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%,-50%)",
				}}
			>
				<div>
					<img src={loader} alt="Loading....." />
					
				</div>
			</div>
		) : null;
        
} 
export default Loader;