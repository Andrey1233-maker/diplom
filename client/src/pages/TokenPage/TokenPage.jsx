import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setToken } from "../../readToken";

export default function TokenPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setToken(token);
      navigate("/");
    }
  });

  return <div>Загрузка токена</div>;
}
