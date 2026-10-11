import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  // console.log(user);
  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <img
        className="rounded-full w-24 h-24"
        src={user?.photoURL}
        alt="image"
      />
      <h3 className="font-black text-2xl">{user?.displayName}</h3>
      <b>{user?.email}</b>
      <p>
        <span className="font-black">UID</span> : {user?.uid}
      </p>
      <p>
        <span className="font-black">CreateAt</span>:{" "}
        {new Date(`${user?.metadata.creationTime}`).toDateString()}
      </p>
    </div>
  );
};

export default Profile;
