import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from 'next/router'

export default function Component() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/home');
  };
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
      <div className="t-2 flex items-center">
          <div className="flex-col items-center">
            Successfully Signed in as {session.user.email} <br />
            <img src={session.user.image} />
        
            <br />
            <div className="text-xl font-bold">
              {session.user.name} <br />
            </div>
          </div>
        
        <button className="max-w-2xl mx-auto p-5" onClick={() => signOut()}>Sign out</button>
        <button onClick={handleClick}>Start Posting</button>
        </div>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if(!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}