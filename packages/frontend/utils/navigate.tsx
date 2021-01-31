import { useHistory } from 'react-router-dom';

export function useNavigate(): (link: string) => void {
  const history = useHistory();
  const navigate = (link: string) => history.push(link);
  return navigate;
}
