import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full bg-gray-50">left</div>
      <div className="w-full bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthRedirect;
