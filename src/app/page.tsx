import Users from '../app/components/Users';
import CreatePost from './components/CreatePost';

interface User {
  id: number;
  username: string;
  lastname: string;
  email: string;
  avatar: string;
  country: string;
}

interface Post {
  id: number;
  img_post:string;
  contenido: string;
  user:User;
  createdAt: Date;
}

export interface PostProps {
  post: Post;
}


async function fetchUser(): Promise<Post[]> {
  const timestamp = new Date().getTime();
  const res = await fetch(`http://localhost:8080/api/v1/publicaciones?timestamp=${timestamp}`);
  const data = await res.json();
  return data;
}

async function Home() {

 const posts: Post[] = await fetchUser();

  return (
    <div className="grid grid-cols-3 px-60 py-20 gap-10">
      <div className="grid gap-4 col-span-2">
        {posts.map(post => (
          <Users key={post.id} post={post} />
        ))}
      </div>
      <div className="col-span-1">
        <CreatePost />
      </div>
    </div>
  );
}

export default Home;
