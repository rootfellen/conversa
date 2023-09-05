import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  return <pre>dashboard</pre>;
};

export default DashboardPage;
