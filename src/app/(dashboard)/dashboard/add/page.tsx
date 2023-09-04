import AddFriendButton from "@/components/add-friend-button";

interface AddFriendPageProps {}

const AddFriendPage: React.FC<AddFriendPageProps> = () => {
  return (
    <main className="pt-8">
      <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default AddFriendPage;
