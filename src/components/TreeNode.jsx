import { useNavigate } from "react-router-dom";

const TreeNode = ({ pose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pose-card/${pose.id}`);
  };

  return (
    <li className="tree-node" onClick={handleClick}>
      <img src={pose.url_png} alt={pose.english_name} className="pose-image" />
      <p className="pose-name">{pose.english_name}</p>
    </li>
  );
};

export default TreeNode;
